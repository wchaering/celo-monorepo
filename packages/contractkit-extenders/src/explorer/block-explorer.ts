import { ABIDefinition, Address, Block, CeloTxPending, parseDecodedParams } from '@celo/connect'
import { ContractKit } from '@celo/contractkit'
import { PROXY_ABI, PROXY_SET_IMPLEMENTATION_SIGNATURE } from '../governance/proxy'
import { ContractDetails, mapFromPairs, obtainKitContractDetails } from './base'

export interface CallDetails {
  contract: string
  function: string
  paramMap: Record<string, any>
  argList: any[]
}

export interface ParsedTx {
  callDetails: CallDetails
  tx: CeloTxPending
}

export interface ParsedBlock {
  block: Block
  parsedTx: ParsedTx[]
}

interface ContractMapping {
  details: ContractDetails
  fnMapping: Map<string, ABIDefinition>
}

export async function newBlockExplorer(kit: ContractKit) {
  return new BlockExplorer(kit, await obtainKitContractDetails(kit))
}

export class BlockExplorer {
  private addressMapping: Map<Address, ContractMapping>

  constructor(private kit: ContractKit, readonly contractDetails: ContractDetails[]) {
    this.addressMapping = mapFromPairs(
      contractDetails.map((cd) => [
        cd.address,
        {
          details: cd,
          fnMapping: mapFromPairs(
            (cd.jsonInterface.concat(PROXY_ABI) as ABIDefinition[])
              .filter((ad) => ad.type === 'function')
              .map((ad) => [ad.signature, ad])
          ),
        },
      ])
    )
  }

  async fetchBlockByHash(blockHash: string): Promise<Block> {
    return this.kit.connection.getBlock(blockHash)
  }
  async fetchBlock(blockNumber: number): Promise<Block> {
    return this.kit.connection.getBlock(blockNumber)
  }

  async fetchBlockRange(from: number, to: number): Promise<Block[]> {
    const results: Block[] = []
    for (let i = from; i < to; i++) {
      results.push(await this.fetchBlock(i))
    }
    return results
  }

  parseBlock(block: Block): ParsedBlock {
    const parsedTx: ParsedTx[] = []
    for (const tx of block.transactions) {
      if (typeof tx !== 'string') {
        const maybeKnownCall = this.tryParseTx(tx)
        if (maybeKnownCall != null) {
          parsedTx.push(maybeKnownCall)
        }
      }
    }

    return {
      block,
      parsedTx,
    }
  }

  tryParseTx(tx: CeloTxPending): null | ParsedTx {
    const callDetails = this.tryParseTxInput(tx.to!, tx.input)
    if (!callDetails) {
      return null
    }

    return {
      tx,
      callDetails,
    }
  }

  tryParseTxInput(address: string, input: string): null | CallDetails {
    const contractMapping = this.addressMapping.get(address)
    if (contractMapping == null) {
      return null
    }

    const callSignature = input.slice(0, 10)
    const encodedParameters = input.slice(10)

    const matchedAbi = contractMapping.fnMapping.get(callSignature)
    if (matchedAbi == null) {
      return null
    }

    const contract =
      matchedAbi.signature === PROXY_SET_IMPLEMENTATION_SIGNATURE
        ? contractMapping.details.name + 'Proxy'
        : contractMapping.details.name

    const { args, params } = parseDecodedParams(
      this.kit.connection.getAbiCoder().decodeParameters(matchedAbi.inputs!, encodedParameters)
    )

    return {
      contract,
      function: matchedAbi.name!,
      paramMap: params,
      argList: args,
    }
  }
}

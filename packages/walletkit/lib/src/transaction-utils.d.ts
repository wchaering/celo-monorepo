import { Callback, ErrorCallback, JSONRPCRequestPayload, PartialTxParams, PrivateKeyWalletSubprovider } from '@0x/subproviders';
import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';
import { Tx } from 'web3/eth/types';
export interface CeloTransaction extends Tx {
    feeCurrency?: string;
    gatewayFeeRecipient?: string;
    gatewayFee?: string;
}
export interface CeloPartialTxParams extends PartialTxParams {
    feeCurrency?: string;
    gatewayFeeRecipient?: string;
    gatewayFee?: string;
}
export declare class CeloProvider extends PrivateKeyWalletSubprovider {
    private static getPrivateKeyWithout0xPrefix;
    private readonly _celoPrivateKey;
    private readonly accountAddress;
    private _chainId;
    constructor(privateKey: string);
    getAccounts(): string[];
    handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: ErrorCallback): Promise<void>;
    signTransactionAsync(txParams: CeloPartialTxParams): Promise<string>;
    private getChainId;
}
/**
 * This method is primarily used for testing at this point.
 * Returns a raw signed transaction which can be used for Celo gold transfer.
 * It is the responsibility of the caller to submit it to the network.
 */
export declare function getRawTransaction(web3: Web3, fromAccountNumber: string, toAccountNumber: string, nonce: number, amount: BigNumber, gasFees: BigNumber, gasPrice: BigNumber, gatewayFeeRecipient?: string, gatewayFee?: BigNumber, feeCurrency?: string, networkId?: number): Promise<string>;

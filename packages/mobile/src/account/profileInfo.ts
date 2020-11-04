import { IdentityMetadataWrapper } from '@celo/contractkit'
import { createStorageClaim } from '@celo/contractkit/lib/identity/claims/claim'
import OffchainDataWrapper from '@celo/contractkit/lib/identity/offchain-data-wrapper'
import { PrivateNameAccessor } from '@celo/contractkit/lib/identity/offchain/accessors/name'
import { LocalStorageWriter } from '@celo/contractkit/lib/identity/offchain/storage-writers'
import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts'
import { NativeSigner } from '@celo/utils/lib/signatureUtils'
import { call, select } from 'redux-saga/effects'
import { nameSelector } from 'src/account/selectors'
import { sendTransaction } from 'src/transactions/send'
import { newTransactionContext } from 'src/transactions/types'
import { getContractKit } from 'src/web3/contracts'
import { currentAccountSelector } from 'src/web3/selectors'

const TAG = 'account/profileInfo'
const BUCKET_URL = 'https://storage.googleapis.com/isabellewei-test/'

class ValoraStorageWriter extends LocalStorageWriter {
  // TEMP for testing
  async write(data: Buffer, dataPath: string): Promise<void> {
    const response = await fetch(`${BUCKET_URL}/${dataPath}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: data,
    })
    if (!response.ok) {
      console.log(response.statusText)
      throw Error('Unable to write')
    }
  }
}

export function* addMetadataClaim(contractKit: any) {
  const address = yield select(currentAccountSelector)
  // const contractKit = yield call(getContractKit)

  const metadata = IdentityMetadataWrapper.fromEmpty(address)
  yield call(
    metadata.addClaim,
    createStorageClaim(BUCKET_URL),
    NativeSigner(contractKit.web3.eth.sign, address)
  )

  yield call(writeToGCPBucket, metadata.toString(), `${address}/metadata.json`)

  const accountsWrapper: AccountsWrapper = yield call([
    contractKit.contracts,
    contractKit.contracts.getAccounts,
  ])
  const setAccountTx = accountsWrapper.setMetadataURL(`${BUCKET_URL}/${address}/metadata.json`)
  const context = newTransactionContext(TAG, 'Set metadata URL')
  yield call(sendTransaction, setAccountTx.txo, address, context)
}

// TEMP for testing
async function writeToGCPBucket(data: string, dataPath: string) {
  const response = await fetch(`${BUCKET_URL}/${dataPath}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  if (!response.ok) {
    console.log(response.statusText)
    throw Error('Unable to claim metadata')
  }
}

export function* uploadName(contractKit: any) {
  const address = yield select(currentAccountSelector)
  const name = yield select(nameSelector)

  const storageWriter = new ValoraStorageWriter(`/tmp/${address}`)
  const offchainWrapper = new OffchainDataWrapper(address, contractKit)
  offchainWrapper.storageWriter = storageWriter
  const nameAccessor = new PrivateNameAccessor(offchainWrapper, address)
  const writeError = yield call(nameAccessor.write, { name }, [])
  if (writeError) {
    console.log(writeError)
    throw Error('Unable to write data')
  }
}

export function* uploadSymmetricKeys(recipientAddresses: string[]) {
  // TODO: check if key for user already exists
  const address = yield select(currentAccountSelector)
  const contractKit = yield call(getContractKit)

  const storageWriter = new ValoraStorageWriter(`/tmp/${address}`)
  const offchainWrapper = new OffchainDataWrapper(address, contractKit)
  offchainWrapper.storageWriter = storageWriter
  const nameAccessor = new PrivateNameAccessor(offchainWrapper, address)
  const writeError = yield call(nameAccessor.writeKeys, { name }, recipientAddresses)
  if (writeError) {
    console.log(writeError)
    throw Error('Unable to write keys')
  }
}

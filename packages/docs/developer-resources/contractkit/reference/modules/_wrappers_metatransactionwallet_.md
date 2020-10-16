# External module: "wrappers/MetaTransactionWallet"

## Index

### Classes

* [MetaTransactionWalletWrapper](../classes/_wrappers_metatransactionwallet_.metatransactionwalletwrapper.md)

### Interfaces

* [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)
* [TransactionObjectWithValue](../interfaces/_wrappers_metatransactionwallet_.transactionobjectwithvalue.md)

### Type aliases

* [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)

### Functions

* [buildMetaTxTypedData](_wrappers_metatransactionwallet_.md#const-buildmetatxtypeddata)
* [toRawTransaction](_wrappers_metatransactionwallet_.md#const-torawtransaction)

## Type aliases

###  TransactionInput

Ƭ **TransactionInput**: *TransactionObject‹T› | [TransactionObjectWithValue](../interfaces/_wrappers_metatransactionwallet_.transactionobjectwithvalue.md)‹T› | [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)*

*Defined in [packages/contractkit/src/wrappers/MetaTransactionWallet.ts:32](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L32)*

## Functions

### `Const` buildMetaTxTypedData

▸ **buildMetaTxTypedData**(`walletAddress`: [Address](_base_.md#address), `tx`: [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md), `nonce`: number, `chainId`: number): *EIP712TypedData*

*Defined in [packages/contractkit/src/wrappers/MetaTransactionWallet.ts:262](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L262)*

**Parameters:**

Name | Type |
------ | ------ |
`walletAddress` | [Address](_base_.md#address) |
`tx` | [RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md) |
`nonce` | number |
`chainId` | number |

**Returns:** *EIP712TypedData*

___

### `Const` toRawTransaction

▸ **toRawTransaction**(`tx`: [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any›): *[RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)*

*Defined in [packages/contractkit/src/wrappers/MetaTransactionWallet.ts:244](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/MetaTransactionWallet.ts#L244)*

Turns any possible way to pass in a transaction into the raw values
that are actually required. This is used both internally to normalize
ways in which transactions are passed in but also public in order
for one instance of ContractKit to serialize a meta transaction to
send over the wire and be consumed somewhere else.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tx` | [TransactionInput](_wrappers_metatransactionwallet_.md#transactioninput)‹any› | TransactionInput<any> union of all the ways we expect transactions |

**Returns:** *[RawTransaction](../interfaces/_wrappers_metatransactionwallet_.rawtransaction.md)*

a RawTransactions that's serializable
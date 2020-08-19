# Class: WalletBase <**TSigner**>

## Type parameters

▪ **TSigner**: *[Signer](../interfaces/_contractkit_src_wallets_signers_signer_.signer.md)*

## Hierarchy

* **WalletBase**

  ↳ [LocalWallet](_contractkit_src_wallets_local_wallet_.localwallet.md)

  ↳ [RemoteWallet](_contractkit_src_wallets_remote_wallet_.remotewallet.md)

## Implements

* [Wallet](../interfaces/_contractkit_src_wallets_wallet_.wallet.md)

## Index

### Methods

* [decrypt](_contractkit_src_wallets_wallet_.walletbase.md#decrypt)
* [getAccounts](_contractkit_src_wallets_wallet_.walletbase.md#getaccounts)
* [hasAccount](_contractkit_src_wallets_wallet_.walletbase.md#hasaccount)
* [signPersonalMessage](_contractkit_src_wallets_wallet_.walletbase.md#signpersonalmessage)
* [signTransaction](_contractkit_src_wallets_wallet_.walletbase.md#signtransaction)
* [signTypedData](_contractkit_src_wallets_wallet_.walletbase.md#signtypeddata)

## Methods

###  decrypt

▸ **decrypt**(`address`: string, `ciphertext`: Buffer): *Promise‹Buffer‹››*

*Defined in [contractkit/src/wallets/wallet.ts:127](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`ciphertext` | Buffer |

**Returns:** *Promise‹Buffer‹››*

___

###  getAccounts

▸ **getAccounts**(): *[Address](../modules/_contractkit_src_base_.md#address)[]*

*Defined in [contractkit/src/wallets/wallet.ts:36](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L36)*

Gets a list of accounts that have been registered

**Returns:** *[Address](../modules/_contractkit_src_base_.md#address)[]*

___

###  hasAccount

▸ **hasAccount**(`address?`: [Address](../modules/_contractkit_src_base_.md#address)): *boolean*

*Defined in [contractkit/src/wallets/wallet.ts:44](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L44)*

Returns true if account has been registered

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address?` | [Address](../modules/_contractkit_src_base_.md#address) | Account to check  |

**Returns:** *boolean*

___

###  signPersonalMessage

▸ **signPersonalMessage**(`address`: [Address](../modules/_contractkit_src_base_.md#address), `data`: string): *Promise‹string›*

*Defined in [contractkit/src/wallets/wallet.ts:88](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L88)*

Sign a personal Ethereum signed message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | [Address](../modules/_contractkit_src_base_.md#address) | Address of the account to sign with |
`data` | string | Hex string message to sign |

**Returns:** *Promise‹string›*

Signature hex string (order: rsv)

___

###  signTransaction

▸ **signTransaction**(`txParams`: Tx): *Promise‹EncodedTransaction›*

*Defined in [contractkit/src/wallets/wallet.ts:67](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L67)*

Gets the signer based on the 'from' field in the tx body

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txParams` | Tx | Transaction to sign  |

**Returns:** *Promise‹EncodedTransaction›*

___

###  signTypedData

▸ **signTypedData**(`address`: [Address](../modules/_contractkit_src_base_.md#address), `typedData`: EIP712TypedData): *Promise‹string›*

*Defined in [contractkit/src/wallets/wallet.ts:105](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wallets/wallet.ts#L105)*

Sign an EIP712 Typed Data message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | [Address](../modules/_contractkit_src_base_.md#address) | Address of the account to sign with |
`typedData` | EIP712TypedData | the typed data object |

**Returns:** *Promise‹string›*

Signature hex string (order: rsv)
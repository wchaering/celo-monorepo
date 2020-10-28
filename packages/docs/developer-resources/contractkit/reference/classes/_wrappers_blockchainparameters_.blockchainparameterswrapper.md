# Class: BlockchainParametersWrapper

Network parameters that are configurable by governance.

## Hierarchy

* [BaseWrapper](_wrappers_basewrapper_.basewrapper.md)‹BlockchainParameters›

  ↳ **BlockchainParametersWrapper**

## Index

### Constructors

* [constructor](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#constructor)

### Properties

* [events](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#events)
* [getBlockGasLimit](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#getblockgaslimit)
* [getUptimeLookbackWindow](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#getuptimelookbackwindow)
* [getIntrinsicGasForAlternativeFeeCurrency](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#getintrinsicgasforalternativefeecurrency)
* [setBlockGasLimit](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#setblockgaslimit)
* [setIntrinsicGasForAlternativeFeeCurrency](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#setintrinsicgasforalternativefeecurrency)
* [setMinimumClientVersion](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#setminimumclientversion)
* [setUptimeLookbackWindow](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#setuptimelookbackwindow)

### Accessors

* [address](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#address)

### Methods

* [getConfig](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#getconfig)
* [getMinimumClientVersion](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#getminimumclientversion)
* [getPastEvents](_wrappers_blockchainparameters_.blockchainparameterswrapper.md#getpastevents)

## Constructors

###  constructor

\+ **new BlockchainParametersWrapper**(`kit`: [ContractKit](_kit_.contractkit.md), `contract`: BlockchainParameters): *[BlockchainParametersWrapper](_wrappers_blockchainparameters_.blockchainparameterswrapper.md)*

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[constructor](_wrappers_basewrapper_.basewrapper.md#constructor)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:19](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`kit` | [ContractKit](_kit_.contractkit.md) |
`contract` | BlockchainParameters |

**Returns:** *[BlockchainParametersWrapper](_wrappers_blockchainparameters_.blockchainparameterswrapper.md)*

## Properties

###  events

• **events**: *any* = this.contract.events

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[events](_wrappers_basewrapper_.basewrapper.md#events)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:33](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L33)*

___

###  getBlockGasLimit

• **getBlockGasLimit**: *function* = proxyCall(this.contract.methods.blockGasLimit, undefined, valueToBigNumber)

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:41](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L41)*

Getting the block gas limit.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  getUptimeLookbackWindow

• **getUptimeLookbackWindow**: *function* = proxyCall(
    this.contract.methods.uptimeLookbackWindow,
    undefined,
    valueToInt
  )

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:31](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L31)*

Getting the uptime lookback window.

###  getIntrinsicGasForAlternativeFeeCurrency

• **getIntrinsicGasForAlternativeFeeCurrency**: *function* = proxyCall(
    this.contract.methods.intrinsicGasForAlternativeFeeCurrency,
    undefined,
    valueToBigNumber
  )

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:24](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L24)*

Get the extra intrinsic gas for transactions, where gas is paid using non-gold currency.

#### Type declaration:

▸ (...`args`: InputArgs): *Promise‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  setBlockGasLimit

• **setBlockGasLimit**: *function* = proxySend(this.kit, this.contract.methods.setBlockGasLimit)

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:46](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L46)*

Setting the block gas limit.

#### Type declaration:

▸ (...`args`: InputArgs): *[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  setIntrinsicGasForAlternativeFeeCurrency

• **setIntrinsicGasForAlternativeFeeCurrency**: *function* = proxySend(
    this.kit,
    this.contract.methods.setIntrinsicGasForAlternativeFeeCurrency
  )

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:33](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L33)*

Setting the extra intrinsic gas for transactions, where gas is paid using non-gold currency.

#### Type declaration:

▸ (...`args`: InputArgs): *[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  setMinimumClientVersion

• **setMinimumClientVersion**: *function* = proxySend(this.kit, this.contract.methods.setMinimumClientVersion)

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:63](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L63)*

Set minimum client version.

#### Type declaration:

▸ (...`args`: InputArgs): *[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

___

###  setUptimeLookbackWindow

• **setUptimeLookbackWindow**: *function* = proxySend(this.kit, this.contract.methods.setUptimeLookbackWindow)

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:39](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L39)*

Setting the uptime lookback window.

#### Type declaration:

▸ (...`args`: InputArgs): *[CeloTransactionObject](_wrappers_basewrapper_.celotransactionobject.md)‹Output›*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | InputArgs |

## Accessors

###  address

• **get address**(): *string*

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[address](_wrappers_basewrapper_.basewrapper.md#address)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:23](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L23)*

Contract address

**Returns:** *string*

## Methods

###  getConfig

▸ **getConfig**(): *Promise‹[BlockchainParametersConfig](../interfaces/_wrappers_blockchainparameters_.blockchainparametersconfig.md)›*

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:68](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L68)*

Returns current configuration parameters.

**Returns:** *Promise‹[BlockchainParametersConfig](../interfaces/_wrappers_blockchainparameters_.blockchainparametersconfig.md)›*

___

###  getMinimumClientVersion

▸ **getMinimumClientVersion**(): *Promise‹[ClientVersion](../interfaces/_wrappers_blockchainparameters_.clientversion.md)›*

*Defined in [packages/contractkit/src/wrappers/BlockchainParameters.ts:51](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BlockchainParameters.ts#L51)*

Get minimum client version.

**Returns:** *Promise‹[ClientVersion](../interfaces/_wrappers_blockchainparameters_.clientversion.md)›*

___

###  getPastEvents

▸ **getPastEvents**(`event`: string, `options`: PastEventOptions): *Promise‹EventLog[]›*

*Inherited from [BaseWrapper](_wrappers_basewrapper_.basewrapper.md).[getPastEvents](_wrappers_basewrapper_.basewrapper.md#getpastevents)*

*Defined in [packages/contractkit/src/wrappers/BaseWrapper.ts:29](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L29)*

Contract getPastEvents

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`options` | PastEventOptions |

**Returns:** *Promise‹EventLog[]›*

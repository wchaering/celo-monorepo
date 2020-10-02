import { CURRENCY_ENUM as Tokens } from '@celo/utils';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-eth';
export default class ContractUtils {
    static readonly defaultGatewayFee: BigNumber;
    static getGoldBalance(web3: Web3, accountNumber: string): Promise<BigNumber>;
    static getDollarBalance(web3: Web3, accountNumber: string): Promise<BigNumber>;
    static getTotalGoldSupply(web3: Web3): Promise<BigNumber>;
    static getExchangeRate(web3: Web3, makerToken: Tokens.GOLD | Tokens.DOLLAR, makerAmount?: BigNumber): Promise<BigNumber>;
    static sendGold(web3: Web3, fromAccountNumber: string, toAccountNumber: string, amount: BigNumber, gasFees: BigNumber, gasPrice?: BigNumber, gatewayFeeRecipient?: string, gatewayFee?: BigNumber, feeCurrency?: Tokens, networkId?: number): Promise<TransactionReceipt>;
    static sendDollar(web3: Web3, fromAccountNumber: string, toAccountNumber: string, amount: BigNumber, gasFees: BigNumber, gasPrice?: BigNumber, gatewayFeeRecipient?: string, gatewayFee?: BigNumber, feeCurrency?: Tokens, networkId?: number): Promise<boolean>;
    static performExchange(web3: Web3, fromAccountNumber: string, sellAmount: BigNumber, sellCurrency: Tokens, minBuyAmount: BigNumber, gasFee: BigNumber): Promise<any>;
    static getGasPrice(web3: Web3, feeCurrency?: Tokens): Promise<BigNumber>;
    static getAddressForCurrencyContract(web3: Web3, currency: Tokens): Promise<string>;
}

import Web3 from 'web3';
import { TransactionReceipt } from 'web3-eth';
import Contract from 'web3/eth/contract';
import { TransactionObject } from 'web3/eth/types';
import { GoldToken } from '../types/GoldToken';
import { StableToken } from '../types/StableToken';
export declare function selectContractByAddress(contracts: Contract[], address: string): Contract | null;
/**
 * Util function to send a transaction and log it's progression
 * Throws error on tx failure
 *
 * TODO(ashishb): This function won't work with locally signed transactions.
 * I am not fixing it since we are going to move to contractkit soon and
 * for now, mobile app only uses sendTransactionAsync function which works
 * with locally signed transactions.
 */
export declare function sendTransaction(tag: string, name: string, tx: TransactionObject<any>, txParams?: any, onTransactionHash?: Function, onReceipt?: Function, onConfirmation?: Function, onError?: Function): Promise<any>;
export declare type TxLogger = (event: SendTransactionLogEvent) => void;
export declare function emptyTxLogger(_event: SendTransactionLogEvent): void;
export interface TxPromises {
    receipt: Promise<TransactionReceipt>;
    transactionHash: Promise<string>;
    confirmation: Promise<boolean>;
}
export declare function awaitConfirmation(txPromises: TxPromises): Promise<boolean>;
export declare type SendTransaction<T> = (tx: TransactionObject<any>, account: string, txId?: string) => Promise<T>;
export declare enum SendTransactionLogEventType {
    Started = 0,
    EstimatedGas = 1,
    ReceiptReceived = 2,
    TransactionHashReceived = 3,
    Confirmed = 4,
    Failed = 5,
    Exception = 6
}
interface Started {
    type: SendTransactionLogEventType.Started;
}
declare const Started: Started;
interface Confirmed {
    type: SendTransactionLogEventType.Confirmed;
}
declare const Confirmed: Confirmed;
export declare type SendTransactionLogEvent = Started | EstimatedGas | ReceiptReceived | TransactionHashReceived | Confirmed | Failed | Exception;
interface EstimatedGas {
    type: SendTransactionLogEventType.EstimatedGas;
    gas: number;
}
declare function EstimatedGas(gas: number): EstimatedGas;
interface ReceiptReceived {
    type: SendTransactionLogEventType.ReceiptReceived;
    receipt: TransactionReceipt;
}
declare function ReceiptReceived(receipt: TransactionReceipt): ReceiptReceived;
interface TransactionHashReceived {
    type: SendTransactionLogEventType.TransactionHashReceived;
    hash: string;
}
declare function TransactionHashReceived(hash: string): TransactionHashReceived;
interface Failed {
    type: SendTransactionLogEventType.Failed;
    error: Error;
}
declare function Failed(error: Error): Failed;
interface Exception {
    type: SendTransactionLogEventType.Exception;
    error: Error;
}
declare function Exception(error: Error): Exception;
/**
 * sendTransactionAsync mainly abstracts the sending of a transaction in a promise like
 * interface. Use the higher-order sendTransactionFactory as a consumer to configure
 * logging and promise resolution
 * TODO: Should probably renamed to sendTransaction once we remove the current
 *       sendTransaction
 * @param tx The transaction object itself
 * @param account The address from which the transaction should be sent
 * @param feeCurrencyContract The contract instance of the Token in which to pay gas for
 * @param logger An object whose log level functions can be passed a function to pass
 *               a transaction ID
 */
export declare function sendTransactionAsync<T>(tx: TransactionObject<T>, account: string, feeCurrencyContract: StableToken | GoldToken, logger?: TxLogger, estimatedGas?: number | undefined): Promise<TxPromises>;
/**
 * sendTransactionAsyncWithWeb3Signing is same as sendTransactionAsync except it fills
 * in the missing fields and locally signs the transaction. It will fail if the `from`
 * is not one of the account whose local signing keys are available. This method
 * should only be used in forno mode where Geth is running remotely.
 *
 * This separate function is temporary and contractkit uses a unified function
 * for both web3 (local) and remote (geth) siging.
 *
 * @param tx The transaction object itself
 * @param account The address from which the transaction should be sent
 * @param feeCurrencyContract The contract instance of the Token in which to pay gas for
 * @param logger An object whose log level functions can be passed a function to pass
 *               a transaction ID
 */
export declare function sendTransactionAsyncWithWeb3Signing<T>(web3: Web3, tx: TransactionObject<T>, account: string, feeCurrencyContract: StableToken | GoldToken, logger?: TxLogger, estimatedGas?: number | undefined): Promise<TxPromises>;
export declare type CeloContract = Contract & {
    name: string;
};
export interface Contracts {
    [name: string]: CeloContract;
}
export declare function getContracts(web3: Web3): Promise<Contracts>;
export {};

import { CeloPartialTxParams } from './transaction-utils';
export declare function signTransaction(txn: CeloPartialTxParams, privateKey: string): Promise<any>;
export declare function recoverTransaction(rawTx: string): string;

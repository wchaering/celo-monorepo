import Web3 from 'web3';
export declare function generateAccountAddressFromPrivateKey(privateKey: string): string;
export declare function getMiner0PrivateKey(networkName: string): string;
export declare function getMiner1PrivateKey(networkName: string): string;
export declare function getMiner0AccountAddress(networkName: string): string;
export declare function getMiner1AccountAddress(networkName: string): string;
export declare function getIpAddressOfTxnNode(networkName: string): Promise<string>;
export declare function getWeb3ForTesting(): Promise<Web3>;
export declare function getWeb3WithSigningAbilityForTesting(privateKey: string): Promise<Web3>;

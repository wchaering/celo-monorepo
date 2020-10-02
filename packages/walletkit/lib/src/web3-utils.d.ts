import Web3 from 'web3';
export declare class Web3Utils {
    static getWeb3(protocol: string, ipAddress: string, port: number): Promise<Web3>;
    static getWeb3WithSigningAbility(protocol: string, ipAddress: string, port: number, privateKey: string): Promise<Web3>;
}

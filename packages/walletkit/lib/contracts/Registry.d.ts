import Web3 from 'web3';
import { Registry as RegistryType } from '../types/Registry';
export default function getInstance(web3: Web3, account?: string | null): Promise<RegistryType>;

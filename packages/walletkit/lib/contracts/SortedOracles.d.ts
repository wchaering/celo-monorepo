import Web3 from 'web3';
import { SortedOracles as SortedOraclesType } from '../types/SortedOracles';
export default function getInstance(web3: Web3, account?: string | null): Promise<SortedOraclesType>;

import Web3 from 'web3';
import { Reserve as ReserveType } from '../types/Reserve';
export default function getInstance(web3: Web3, account?: string | null): Promise<ReserveType>;

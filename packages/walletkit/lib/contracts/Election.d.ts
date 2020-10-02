import Web3 from 'web3';
import { Election as ElectionType } from '../types/Election';
export default function getInstance(web3: Web3, account?: string | null): Promise<ElectionType>;

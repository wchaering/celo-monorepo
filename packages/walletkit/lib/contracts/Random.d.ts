import Web3 from 'web3';
import { Random as RandomType } from '../types/Random';
export default function getInstance(web3: Web3, account?: string | null): Promise<RandomType>;

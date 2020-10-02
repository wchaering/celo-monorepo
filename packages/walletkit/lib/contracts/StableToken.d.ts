import Web3 from 'web3';
import { StableToken as StableTokenType } from '../types/StableToken';
export default function getInstance(web3: Web3, account?: string | null): Promise<StableTokenType>;

import Web3 from 'web3';
import { GoldToken as GoldTokenType } from '../types/GoldToken';
export default function getInstance(web3: Web3, account?: string | null): Promise<GoldTokenType>;

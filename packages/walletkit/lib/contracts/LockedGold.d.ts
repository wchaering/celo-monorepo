import Web3 from 'web3';
import { LockedGold as LockedGoldType } from '../types/LockedGold';
export default function getInstance(web3: Web3, account?: string | null): Promise<LockedGoldType>;

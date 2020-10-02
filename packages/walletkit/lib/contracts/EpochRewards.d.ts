import Web3 from 'web3';
import { EpochRewards as EpochRewardsType } from '../types/EpochRewards';
export default function getInstance(web3: Web3, account?: string | null): Promise<EpochRewardsType>;

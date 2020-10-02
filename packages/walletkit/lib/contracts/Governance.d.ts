import Web3 from 'web3';
import { Governance as GovernanceType } from '../types/Governance';
export default function getInstance(web3: Web3, account?: string | null): Promise<GovernanceType>;

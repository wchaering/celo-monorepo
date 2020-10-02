import Web3 from 'web3';
import { BondedDeposits as BondedDepositsType } from '../types/BondedDeposits';
export default function getInstance(web3: Web3, account?: string | null): Promise<BondedDepositsType>;

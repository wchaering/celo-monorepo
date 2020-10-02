import Web3 from 'web3';
import { Accounts as AccountsType } from '../types/Accounts';
export default function getInstance(web3: Web3, account?: string | null): Promise<AccountsType>;

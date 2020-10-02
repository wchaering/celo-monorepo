import Web3 from 'web3';
import { Exchange as ExchangeType } from '../types/Exchange';
export default function getInstance(web3: Web3, account?: string | null): Promise<ExchangeType>;

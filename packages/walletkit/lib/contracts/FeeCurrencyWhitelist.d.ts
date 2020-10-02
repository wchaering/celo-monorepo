import Web3 from 'web3';
import { FeeCurrencyWhitelist as FeeCurrencyWhitelistType } from '../types/FeeCurrencyWhitelist';
export default function getInstance(web3: Web3, account?: string | null): Promise<FeeCurrencyWhitelistType>;

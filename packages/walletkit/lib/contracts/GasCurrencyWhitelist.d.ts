import Web3 from 'web3';
import { GasCurrencyWhitelist as GasCurrencyWhitelistType } from '../types/GasCurrencyWhitelist';
export default function getInstance(web3: Web3, account?: string | null): Promise<GasCurrencyWhitelistType>;

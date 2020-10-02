import Web3 from 'web3';
import { GasPriceMinimum as GasPriceMinimumType } from '../types/GasPriceMinimum';
export default function getInstance(web3: Web3, account?: string | null): Promise<GasPriceMinimumType>;

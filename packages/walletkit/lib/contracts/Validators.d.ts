import Web3 from 'web3';
import { Validators as ValidatorsType } from '../types/Validators';
export default function getInstance(web3: Web3, account?: string | null): Promise<ValidatorsType>;

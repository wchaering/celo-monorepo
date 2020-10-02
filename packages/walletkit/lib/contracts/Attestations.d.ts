import Web3 from 'web3';
import { Attestations as AttestationsType } from '../types/Attestations';
export default function getInstance(web3: Web3, account?: string | null): Promise<AttestationsType>;

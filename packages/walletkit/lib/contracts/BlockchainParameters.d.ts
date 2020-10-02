import Web3 from 'web3';
import { BlockchainParameters as BlockchainParametersType } from '../types/BlockchainParameters';
export default function getInstance(web3: Web3, account?: string | null): Promise<BlockchainParametersType>;

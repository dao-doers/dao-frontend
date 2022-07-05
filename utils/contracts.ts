import { providers } from 'ethers';

import DCKBTokenJSON from 'lib/DCKBToken.json';
import MolochV2JSON from 'lib/MolochV2.json';

import { loadContract } from 'utils/blockchain';

export const DCKBToken = (provider: any, chainId: string) => loadContract(provider, DCKBTokenJSON, chainId);
export const MolochV2 = (provider: providers.JsonRpcProvider | providers.JsonRpcSigner, chainId: string) =>
  loadContract(provider, MolochV2JSON, chainId);

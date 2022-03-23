import { BigNumber } from 'ethers';

import { NetworkName } from 'components/Bridge/models/data';
import { TokensRegistry } from 'api/types';

export interface INetworkAdapter {
  id: string;
  name: NetworkName;
  getBalance(tokenAddress: string, accountAddress: string): Promise<BigNumber>;
  getTokens(): TokensRegistry;
  getSignerAddress(): Promise<string>;
  sign(message: string): Promise<string>;
}

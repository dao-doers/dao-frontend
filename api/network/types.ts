import { BigNumber } from 'ethers';

import { TokensRegistry } from 'api/types';
import { Network, NetworkName } from 'interfaces/data';

export interface INetworkAdapter {
  id: Network;
  name: NetworkName;
  getBalance(tokenAddress: string, accountAddress: string): Promise<BigNumber>;
  getTokens(): TokensRegistry;
  getSignerAddress(): Promise<string>;
  sign(message: string): Promise<string>;
}

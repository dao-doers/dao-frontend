import WALLET_TYPES from 'enums/walletTypes';

import WalletConnect from './WalletConnect';

export { default as WalletConnect } from './WalletConnect';

export const connectors = {
  [WALLET_TYPES.WALLETCONNECT]: WalletConnect,
  [WALLET_TYPES.NONE]: undefined,
};

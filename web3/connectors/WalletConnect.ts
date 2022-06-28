import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import chainConfig from '../chainConfig';
import Connector from './Connector';

const WalletConnect: Connector<WalletConnectConnector> = (() => {
  const chainId = chainConfig.chainId.dec;

  return {
    connector: new WalletConnectConnector({
      rpc: {
        71402: 'https://v1.mainnet.godwoken.io/rpc',
      },
      qrcode: true,
      supportedChainIds: [71402],
      chainId,
    }),
    canConnect: () => true,
    switchNetwork: async () => undefined,
  };
})();

export default WalletConnect;

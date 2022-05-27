import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import chainConfig from '../chainConfig';
import Connector from './Connector';

const WalletConnect: Connector<WalletConnectConnector> = (() => {
  const chainId = chainConfig.chainId.dec;

  return {
    connector: new WalletConnectConnector({
      rpc: {
        71401: 'https://godwoken-testnet-v1.ckbapp.dev',
      },
      qrcode: true,
      supportedChainIds: [71401],
      chainId,
    }),
    canConnect: () => true,
    switchNetwork: async () => undefined,
  };
})();

export default WalletConnect;

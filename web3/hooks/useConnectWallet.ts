import { useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';

import WALLET_TYPES from 'enums/walletTypes';
import PROCESSING_STATUSES from 'enums/processingStatuses';

import { connectors } from '../connectors';

const activateWithNetworkSwitch = async (
  activate: (connector: AbstractConnector, onError?: any, throwErrors?: boolean) => Promise<any>,
  connector: AbstractConnector,
  switchNetwork: () => Promise<any>,
) => {
  try {
    await activate(connector, undefined, true);
  } catch (error) {
    if (error instanceof UnsupportedChainIdError) {
      await switchNetwork();
      await activate(connector, undefined, true);
    } else {
      throw error;
    }
  }
};

const useConnectWallet = () => {
  const { activate } = useWeb3React<Web3Provider>();

  return useCallback(
    async (walletType: WALLET_TYPES) => {
      const targetConnector = connectors[WALLET_TYPES.WALLETCONNECT];

      if (targetConnector === undefined) {
        return;
      }

      const { connector, canConnect, switchNetwork } = targetConnector;

      try {
        if (!canConnect()) {
          throw new Error('Invalid configuration - canConnect returned false!');
        }

        await activateWithNetworkSwitch(activate, connector, switchNetwork);

        const address = await connector.getAccount();
      } catch (error) {
        // TODO: remove console.log later
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [activate],
  );
};

export default useConnectWallet;

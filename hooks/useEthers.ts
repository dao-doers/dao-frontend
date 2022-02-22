import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import { PolyjuiceWebsocketProvider } from '@polyjuice-provider/web3';
import { PolyjuiceWebsocketProvider as EthersPolyjuiceWebsocketProvider } from '@polyjuice-provider/ethers';
import config from 'config/config';
// import Web3 from 'web3';

// https://github.com/nervosnetwork/godwoken-info/tree/master/testnet
// const providerConfig = {
//   rollupTypeHash: config.ROLLUP_TYPE_HASH,
//   ethAccountLockCodeHash: config.ETH_ACCOUNT_LOCK_CODE_HASH,
//   web3Url: config.WEB3_URL,
// };

// const web3 = new Web3(provider);
// const web3 = new Web3(window.ethereum);

const useEthers = (connectedAccountAddress: string | null) => {
  const [ethers, setEthers] = useState<providers.Provider | null>(null);

  useEffect(() => {
    if (connectedAccountAddress) {
      const provider = new EthersPolyjuiceWebsocketProvider(
        {
          rollupTypeHash: config.nervos.rollupTypeHash,
          ethAccountLockCodeHash: config.nervos.ethAccountLockCodeHash,
          web3Url: config.nervos.godwoken.rpcUrl,
        },
        config.nervos.godwoken.wsUrl,
      );
      const providerCopy = (provider as unknown) as providers.Provider;
      setEthers(providerCopy);
    }
  }, [connectedAccountAddress]);

  return ethers;
};

export default useEthers;

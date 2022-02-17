import React, { Suspense } from 'react';
import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import { useSelector } from 'react-redux';
import { selectUserAddress } from 'redux/slices/user';
import { PolyjuiceWebsocketProvider as EthersPolyjuiceWebsocketProvider } from '@polyjuice-provider/ethers';
import { ethers } from 'ethers';

import { BridgeComponent } from 'nervos-bridge';
import config from 'config/config';

const provider = new EthersPolyjuiceWebsocketProvider(
  {
    rollupTypeHash: config.nervos.rollupTypeHash,
    ethAccountLockCodeHash: config.nervos.ethAccountLockCodeHash,
    web3Url: config.nervos.godwoken.rpcUrl,
  },
  config.nervos.godwoken.wsUrl,
);

const DAOBridgeComponent = () => {
  const userAddress = useSelector(selectUserAddress);
  // const { provider } = useCheckIndexerStatus();

  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  console.log('accounts: ', userAddress);
  console.log('provider: ', provider);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <BridgeComponent provider={null} />
      {/* <BridgeComponent provider={provider} userAddress={userAddress} assetsBlacklist={[]} /> */}
    </Suspense>
  );
};

export default DAOBridgeComponent;

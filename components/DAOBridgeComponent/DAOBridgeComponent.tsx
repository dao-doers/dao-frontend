import React, { Suspense } from 'react';
import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import { useSelector } from 'react-redux';
import { selectUserAddress } from 'redux/slices/user';
import { PolyjuiceWebsocketProvider as EthersPolyjuiceWebsocketProvider } from '@polyjuice-provider/ethers';
import { ethers } from 'ethers';
import { BridgeComponent } from 'nervos-bridge';
import config from 'config/config';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const provider = new EthersPolyjuiceWebsocketProvider(
  {
    rollupTypeHash: config.nervos.rollupTypeHash,
    ethAccountLockCodeHash: config.nervos.ethAccountLockCodeHash,
    web3Url: config.nervos.godwoken.rpcUrl,
  },
  config.nervos.godwoken.wsUrl,
);

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const DAOBridgeComponent = () => {
  const userAddress = useSelector(selectUserAddress);
  // const { provider } = useCheckIndexerStatus();

  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  console.log('accounts: ', userAddress);
  console.log('provider: ', provider);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Box>
        <TypographyBold variant="h3" mb={3} mt={8}>
          Nervos dCKB bridge
        </TypographyBold>
        <Box maxWidth="700px" mx="auto">
          <BridgeComponent provider={null} />
        </Box>
      </Box>

      {/* <BridgeComponent provider={provider} userAddress={userAddress} assetsBlacklist={[]} /> */}
    </Suspense>
  );
};

export default DAOBridgeComponent;

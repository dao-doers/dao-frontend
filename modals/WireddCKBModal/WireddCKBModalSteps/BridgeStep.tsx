import { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import dynamic from 'next/dynamic';

import useCheckProvider from 'hooks/useCheckProvider';

import { selectIsLoggedIn } from 'redux/slices/user';
import BridgeComponent from 'components/Bridge/Bridge';

const DAOBridgeComponentWithNoSSR = dynamic(() => import('components/DAOBridgeComponent/DAOBridgeComponent'), {
  ssr: false,
});

interface IBridge {
  handlePreviousStep: () => void;
}

const NavButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col6};
  font-weight: 600;
`;

const BridgeStep: FC<IBridge> = ({ handlePreviousStep }) => {
  const hasProvider = useCheckProvider();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box mt={5} mb={4}>
      <Box>
        <Typography component="h6" variant="h6" paragraph>
          Transfer dCKB to Layer2
        </Typography>
        <Typography component="h6">
          Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum
          balance of 471 CKB needs to be maintained after transaction.
        </Typography>
        {/* {hasProvider && isLoggedIn ? ( */}
          <Box pb={20}>
            {/* <DAOBridgeComponentWithNoSSR /> */}
            <BridgeComponent />
          </Box>
        {/* ) : (
          <Box mt={3}>
            <TypographyRed paragraph>You have to login by metamask to use our beta version Bridge.</TypographyRed>
            <ConnectWalletButton />
          </Box>
        )} */}
      </Box>

      <NavButtonsWrapper>
        <Box width="48%">
          <DAOButton onClick={handlePreviousStep}>Previous step</DAOButton>
        </Box>
      </NavButtonsWrapper>
    </Box>
  );
};

export default BridgeStep;

import { FC } from 'react';

import styled from '@emotion/styled';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import dynamic from 'next/dynamic';

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

const BridgeStep: FC<IBridge> = ({ handlePreviousStep }) => {
  return (
    <Box mt={5} mb={4}>
      <Box>
        <Typography component="h6" variant="h6" paragraph>
          Transfer dCKB to Layer2
        </Typography>
        <Typography component="h6">
          Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum
          balance of 471 CKB needs to be maintained.
        </Typography>
        <DAOBridgeComponentWithNoSSR />
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

import { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

const LoginStep: FC = () => {
  return (
    <Box mt={5} mb={4}>
      <Typography component="h6" variant="h6" mb={4}>
        You must connect your wallet at first
      </Typography>
      <ConnectWalletButton />
    </Box>
  );
};

export default LoginStep;

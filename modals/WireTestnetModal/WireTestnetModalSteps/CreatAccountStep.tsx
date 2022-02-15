import React, { FC } from 'react';

import DAOButton from 'components/DAOButton/DAOButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CreatAccountStep: FC = () => {
  return (
    <Box mt={2} mb={2}>
      <Typography component="h5" variant="h5" align="center" paragraph>
        Create account on Nervos Layer 2
      </Typography>
      <Typography component="h6" align="center" paragraph>
        to complete this step click on the button, you will be taken to an external page where you will be able to
        create your account address on leyer 2
      </Typography>
      <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
        <DAOButton
          variant="agreeVariant"
          onClick={() => window.open('https://dev.ckb.tools/create-layer2-account', '_blank')}
        >
          CREATE ACCOUNT
        </DAOButton>
      </Box>
      <Typography variant="h6" align="center" paragraph>
        If You already have a Nervos Layer 2 account with CKB, please submit step.
      </Typography>
    </Box>
  );
};

export default CreatAccountStep;

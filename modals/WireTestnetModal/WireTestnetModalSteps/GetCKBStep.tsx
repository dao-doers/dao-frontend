import React, { FC } from 'react';

import DAOButton from 'components/DAOButton/DAOButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const GetCKBStep: FC = () => {
  return (
    <Box mt={2} mb={2}>
      <Typography component="h5" variant="h5" align="center" paragraph>
        Get CKB from Layer 1
      </Typography>
      <Typography component="h6" align="center" paragraph>
        Go to NexisDAO and connect with metamask. Next, copy CKB address (copy button here or) from top left of NexisDAO
        page. Get CKB from Layer 1 faucet (https://faucet.nervos.org/) by pasting the CKB address from step one
      </Typography>
      <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
        <DAOButton variant="agreeVariant" onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}>
          NexisDAO page
        </DAOButton>
      </Box>
      <Typography variant="h6" align="center" paragraph>
        Get CKB from Layer 1 faucet by pasting the CKB address from NexisDAO page
      </Typography>
      <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
        <DAOButton variant="agreeVariant" onClick={() => window.open('https://faucet.nervos.org/', '_blank')}>
          Layer 1 faucet
        </DAOButton>
      </Box>
    </Box>
  );
};

export default GetCKBStep;

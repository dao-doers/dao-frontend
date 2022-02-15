import React, { FC } from 'react';

import DAOButton from 'components/DAOButton/DAOButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ReceiveCKBStep: FC = () => {
  return (
    <Box mt={2} mb={2}>
      <Typography component="h5" variant="h5" align="center" paragraph>
        Stake CKB via NexisDAO
      </Typography>
      <Typography component="h6" align="center" paragraph>
        On NexisDAO Page, fill in the form field as much as you would like to deposit from your total balance, the
        tokens will be locked for 1 month and you will get an equivalent in dCKB, next press the Mint button.
      </Typography>
      <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
        <DAOButton variant="agreeVariant" onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}>
          Stake CKB
        </DAOButton>
      </Box>
    </Box>
  );
};

export default ReceiveCKBStep;

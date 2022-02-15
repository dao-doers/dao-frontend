import React, { FC } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DAOInput from 'components/DAOInput/DAOInput';

interface IBridge {
  onChange: (value: number) => void;
  value: number;
}
const BridgeStep: FC<IBridge> = ({ onChange, value }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onChange(value);
  };

  return (
    <Box mt={2} mb={2}>
      <Typography component="h5" variant="h5" align="center" paragraph>
        Transfer dCKB to Layer2
      </Typography>
      <Typography component="h6" align="center" paragraph>
        Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum balance
        of 471 CKB needs to be maintained.
      </Typography>
      <DAOInput
        label="Deposit to get"
        inputProps={{
          id: 'Transfer',
          value,
          onChange: handleInputChange,
        }}
        formControlProps={{
          fullWidth: true,
        }}
      />
    </Box>
  );
};

export default BridgeStep;

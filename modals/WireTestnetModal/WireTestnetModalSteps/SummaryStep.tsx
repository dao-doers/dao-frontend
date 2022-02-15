import React, { FC } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SummaryStep: FC = () => {
  return (
    <Box mt={2} mb={2}>
      <Typography component="h5" variant="h5" align="center" paragraph>
        Check dCKB balance on Layer 2
      </Typography>
    </Box>
  );
};

export default SummaryStep;

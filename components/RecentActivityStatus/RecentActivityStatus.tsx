import { Box } from '@mui/system';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import Typography from '@mui/material/Typography';

import SyncIcon from '@mui/icons-material/Sync';
import styled from '@emotion/styled';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

interface IRecentActivityStatus {
  refetch: () => void;
  timer: JSX.Element;
}

const RecentActivityStatus = ({ refetch, timer }: IRecentActivityStatus) => {
  return (
    <Box display="flex" alignSelf="flex-end" justifyContent="flex-end">
      <Box display="flex" flexDirection="column" pr={2}>
        <TypographyBold variant="h6">Recent Activity </TypographyBold>
        <Box>{timer}</Box>
      </Box>
      <Box display="flex" width="50px">
        <DAOPlainButton variant="gradientOutline" onClick={refetch}>
          <Tooltip arrow title="Refresh data" placement="bottom">
            <SyncIcon />
          </Tooltip>
        </DAOPlainButton>
      </Box>
    </Box>
  );
};

export default RecentActivityStatus;

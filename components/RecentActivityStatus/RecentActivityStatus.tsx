import { Box } from '@mui/system';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';

import SyncIcon from '@mui/icons-material/Sync';
import styled from '@emotion/styled';

const StyledSyncIcon = styled(SyncIcon)`
  font-size: 17px;
  color: ${({ theme }) => theme.palette.colors.col1};
`;

interface IRecentActivityStatus {
  refetch: () => void;
  timer: JSX.Element;
}

const RecentActivityStatus = ({ refetch, timer }: IRecentActivityStatus) => {
  return (
    <Box display="flex" alignSelf="flex-start" justifyContent="flex-start">
      <Box>
        <Box>{timer}</Box>
      </Box>
      <Box ml={2}>
        <DAOPlainButton variant="gradientOutline" onClick={refetch}>
          <Tooltip arrow title="Refresh data" placement="bottom">
            <StyledSyncIcon />
          </Tooltip>
        </DAOPlainButton>
      </Box>
    </Box>
  );
};

export default RecentActivityStatus;

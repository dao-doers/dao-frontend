import { Box } from '@mui/system';
import React from 'react';

import Tooltip from '@mui/material/Tooltip';
import SyncIcon from '@mui/icons-material/Sync';
import styled from '@emotion/styled';

import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import Timer from 'components/Timer/Timer';

import useFetchProposals from 'hooks/useFetchProposals';

const StyledSyncIcon = styled(SyncIcon)`
  font-size: 17px;
  color: ${({ theme }) => theme.palette.colors.col1};
`;

const RecentActivityStatus = () => {
  const refetchProposal = useFetchProposals();

  const refetch = () => {
    refetchProposal.refetch();
  };

  return (
    <Box display="flex" alignSelf="flex-start" justifyContent="flex-start">
      <Box>
        <Box>
          <Timer reset={refetchProposal.loading} />
        </Box>
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

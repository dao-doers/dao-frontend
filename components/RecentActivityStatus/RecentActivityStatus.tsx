import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from '@mui/material/Tooltip';

import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import Timer from 'components/Timer/Timer';

import useFetchProposals from 'hooks/useFetchProposals';

import { setProposals } from 'redux/slices/proposals';

const StyledSyncIcon = styled(SyncIcon)`
  font-size: 17px;
  color: ${({ theme }) => theme.palette.colors.col1};
`;

const StyledCheckIcon = styled(CheckIcon)`
  font-size: 17px;
  color: ${({ theme }) => theme.palette.colors.col2};
`;

const RecentActivityStatus = () => {
  const dispatch = useDispatch();
  const refetchProposal = useFetchProposals();

  const [isClicked, setClicked] = useState(false);

  const refetch = () => {
    refetchProposal.refetch();
    dispatch(setProposals(refetchProposal.data.proposals));
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  return (
    <Box display="flex" alignSelf="flex-start" justifyContent="flex-start">
      <Box>
        <Box>
          <Timer reset={refetchProposal.loading} />
        </Box>
      </Box>
      <Box ml={0.5}>
        <DAOPlainButton variant="gradientOutline" onClick={refetch}>
          <Tooltip arrow title="Refresh data" placement="bottom">
            {isClicked ? <StyledCheckIcon /> : <StyledSyncIcon />}
          </Tooltip>
        </DAOPlainButton>
      </Box>
    </Box>
  );
};

export default RecentActivityStatus;

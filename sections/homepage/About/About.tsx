import React, { FC } from 'react';

import styled from '@emotion/styled';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';
import Link from 'components/Link/Link';

import { APP_ROUTES } from 'utils/routes';

import useIsMobile from 'hooks/useIsMobile';
import { useSelector } from 'react-redux';
import { tributeTokenToDisplayValue } from 'utils/units';
import { selectGuildTributeTokenBalance, selectTotalLoot, selectTotalShares } from 'redux/slices/dao';
import { selectAllMembers } from 'redux/slices/user';

const ColumnsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ColumnWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const StyledAddReactionIcon = styled(AddReactionIcon)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledAddTaskIcon = styled(AddTaskIcon)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-size: 40px;
  margin-bottom: 30px;
`;

const Title = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    text-align: center;
  }
`;

const About: FC = () => {
  const isMobile = useIsMobile('lg');
  const guildTributeTokenBalance = useSelector(selectGuildTributeTokenBalance);
  const daoTotalLoot = useSelector(selectTotalLoot);
  const daoTotalShares = useSelector(selectTotalShares);
  const members = useSelector(selectAllMembers);

  return (
    <>
      <Box mb={8}>
        <Title variant="h3-bold" paragraph>
          How does it work
        </Title>
        <ColumnsWrapper>
          <ColumnWrapper>
            <StyledAddReactionIcon />
            <Typography variant="subtitle2">Anyone can create a proposal to join DAO.</Typography>

            {isMobile && (
              <Box mx="auto" mb={1} mt={3} sx={{ width: { xs: '250px', sm: 'auto' } }}>
                <Link internal href={APP_ROUTES.CREATE}>
                  <DAOButton variant="gradientOutline">
                    <Typography noWrap>Create proposal</Typography>
                  </DAOButton>
                </Link>
              </Box>
            )}
          </ColumnWrapper>
          <ColumnWrapper>
            <StyledAddCircleOutlineIcon />
            <Typography variant="subtitle2">
              Proposal has to be sponsored by one of DAO members with voting shares and then pass the vote.
            </Typography>
          </ColumnWrapper>
          <ColumnWrapper>
            <StyledAddTaskIcon />
            <Typography variant="subtitle2">
              Once the proposal is approved, it goes to the grace period and then execution phase.
            </Typography>
          </ColumnWrapper>
        </ColumnsWrapper>
      </Box>
      <Box mb={8}>
        <Title variant="h3-bold" paragraph>
          Dashboard
        </Title>
        <ColumnsWrapper>
          <ColumnWrapper>
            <Typography variant="subtitle2">
              Members with voting rights:{' '}
              {members?.filter(m => m.exists && !m.didRagequit && !m.kicked && m.shares !== '0').length}
            </Typography>
          </ColumnWrapper>
          <ColumnWrapper>
            <Typography variant="subtitle2">
              Guild balance: {guildTributeTokenBalance ? tributeTokenToDisplayValue(guildTributeTokenBalance) : '-'}{' '}
              pCKB
              <br />
              Total shares: {daoTotalShares?.toString()}
              <br />
              Total loot: {daoTotalLoot?.toString()}
            </Typography>
          </ColumnWrapper>
          <ColumnWrapper>
            <Typography variant="subtitle2">
              Share and loot to pCKB ratio:{' '}
              {guildTributeTokenBalance && daoTotalShares && daoTotalLoot
                ? tributeTokenToDisplayValue(guildTributeTokenBalance.div(daoTotalShares.add(daoTotalLoot)))
                : '-'}{' '}
              pCKB
            </Typography>
          </ColumnWrapper>
        </ColumnsWrapper>
      </Box>
    </>
  );
};

export default About;

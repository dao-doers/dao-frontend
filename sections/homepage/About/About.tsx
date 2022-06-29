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
import { shannonsToDisplayValue } from 'utils/units';
import { selectGuildTributeTokenBalance, selectTotalShares } from 'redux/slices/dao';

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
  const daoTotalShares = useSelector(selectTotalShares);

  return (
    <>
      <Box mb={8}>
        <Title variant="h3-bold" paragraph>
          How does it work
        </Title>
        <ColumnsWrapper>
          <ColumnWrapper>
            <StyledAddReactionIcon />
            <Typography variant="subtitle2">
              Every person can create proposal request to join our guild which will allow you to take part in votings.
            </Typography>

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
              Every guild member can create his own proposal on which the community will vote.
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
              DAO guild balance: {guildTributeTokenBalance ? shannonsToDisplayValue(guildTributeTokenBalance) : '-'}{' '}
              dCKB
            </Typography>
          </ColumnWrapper>
          <ColumnWrapper>
            <Typography variant="subtitle2">DAO total shares: {daoTotalShares?.toString()}</Typography>
          </ColumnWrapper>
          <ColumnWrapper>
            <Typography variant="subtitle2">
              Share to dCKB ratio:{' '}
              {guildTributeTokenBalance && daoTotalShares
                ? shannonsToDisplayValue(guildTributeTokenBalance.div(daoTotalShares))
                : '-'}{' '}
              dCKB
            </Typography>
          </ColumnWrapper>
        </ColumnsWrapper>
      </Box>
    </>
  );
};

export default About;

import React, { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';

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

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const StyledAddReactionIcon = styled(AddReactionIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 40px;
  margin-bottom: 30px;
`;

const StyledAddTaskIcon = styled(AddTaskIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 40px;
  margin-bottom: 30px;
`;

const About: FC = () => {
  return (
    <Box>
      <TypographyBold variant="h3" paragraph mt={8}>
        How does it works
      </TypographyBold>
      <ColumnsWrapper>
        <ColumnWrapper>
          <StyledAddReactionIcon />
          <Typography variant="subtitle2">
            Every person can request to join our guild which will allow you to take part in votings.
          </Typography>
        </ColumnWrapper>
        <ColumnWrapper>
          <StyledAddCircleOutlineIcon />
          <Typography variant="subtitle2">
            Every guild member can create his own proposal on which the community will vote.
          </Typography>
        </ColumnWrapper>
        <ColumnWrapper>
          <StyledAddTaskIcon />
          <Typography variant="subtitle2">Once the proposal is approved, it goes to the execution phase.</Typography>
        </ColumnWrapper>
      </ColumnsWrapper>
    </Box>
  );
};

export default About;

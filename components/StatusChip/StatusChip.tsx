import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface StatusChipProps {
  title?: string;
}

const StyledBox = styled(Box)`
  /* border: 1px solid ${({ theme }) => theme.palette.colors.main9}; */
  border-right: 1px solid ${({ theme }) => theme.palette.colors.main9};
  /* border-radius: 30px; */
  padding: 5px 20px;
`;

const StatusChip: FC<StatusChipProps> = ({ title, children }) => {
  return (
    <StyledBox>
      <Typography variant="body2">{title}</Typography>
      {children}
    </StyledBox>
  );
};

export default StatusChip;

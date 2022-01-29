import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface StatusChipProps {
  title: string;
}

const StyledBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.colors.main9};
  border-radius: 10px;
  padding: 5px 20px;
`;

const TypographyColor = styled(Typography)`
  font-weight: 500;
`;

const StatusChip: FC<StatusChipProps> = ({ title, children }) => {
  return (
    <StyledBox>
      <TypographyColor variant="body2">{title}</TypographyColor>
      {children}
    </StyledBox>
  );
};

export default StatusChip;

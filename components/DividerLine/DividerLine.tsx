import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

const Divider = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.colors.main5};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DividerLine: FC = () => {
  return <Divider />;
};

export default DividerLine;

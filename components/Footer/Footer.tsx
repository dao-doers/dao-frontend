import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from 'components/Link/Link';

const TypographyGrey = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main6};
`;

const Footer: FC = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%" mt={10} mb={4}>
      <Box mx={2}>
        <Link href="/" target="_blank" rel="noreferrer noopener">
          <TypographyGrey>TERMS OF USE</TypographyGrey>
        </Link>
      </Box>
      <Box mx={2}>
        <Link href="/" target="_blank" rel="noreferrer noopener">
          <TypographyGrey>PRIVACY POLICY</TypographyGrey>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;

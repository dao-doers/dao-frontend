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
        <Link href="https://mainnet.bridge.godwoken.io" target="_blank" rel="noreferrer noopener">
          <TypographyGrey>GODWOKEN BRIDGE</TypographyGrey>
        </Link>
      </Box>
      <Box mx={2}>
        <Link href="https://app.nexisdao.com/dckb" target="_blank" rel="noreferrer noopener">
          <TypographyGrey>NEXISDAO DCKB APP</TypographyGrey>
        </Link>
      </Box>
      <Box mx={2}>
        <Link href="https://github.com/dao-doers" target="_blank" rel="noreferrer noopener">
          <TypographyGrey>GITHUB</TypographyGrey>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;

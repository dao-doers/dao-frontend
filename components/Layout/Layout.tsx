import { FC, ReactNode } from 'react';

import styled from '@emotion/styled';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import DesktopMenu from 'components/DesktopMenu/DesktopMenu';
import Footer from 'components/Footer/Footer';
import MobileMenu from 'components/MobileMenu/MobileMenu';
import BlockchainStatus from 'components/BlockchainStatus/BlockchainStatus';
import { Web3Provider } from 'components/providers';

export type LayoutProps = {
  children: ReactNode;
};

const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBox = styled(Box)`
  display: flex;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Web3Provider>
      <StyledContainer>
        <MobileMenu />

        <StyledBox>
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <DesktopMenu />
          </Box>

          <Box width="100%">
            <BlockchainStatus />
            {children}
          </Box>
        </StyledBox>

        <Footer />
      </StyledContainer>
    </Web3Provider>
  );
};

export default Layout;

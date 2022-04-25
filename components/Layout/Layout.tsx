import { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import BlockchainStatusContent from 'components/BlockchainStatusContent/BlockchainStatusContent';
import DesktopMenu from 'components/Menu/DesktopMenu/DesktopMenu';
import Footer from 'components/Footer/Footer';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import MobileMenu from 'components/Menu/MobileMenu/MobileMenu';

import THEME_MODES from 'enums/themeModes';

import useIsMobile from 'hooks/useIsMobile';
import useMaintainSession from 'hooks/useMaintainSession';
import useTestFunction from 'hooks/useTestFunction';

import FETCH_STATUSES from 'enums/fetchStatuses';

import { loadWeb3 } from 'utils/blockchain';

import { setTheme } from 'redux/slices/theme';
import { selectFetchStatus as selectProposalsFetchStatus, getProposalsList } from 'redux/slices/proposals';
import { selectFetchStatus as selectVotesFetchStatus, getVotesList } from 'redux/slices/votes';
import { getUsersList } from 'redux/slices/user';

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

declare global {
  interface Window {
    web3: Web3;
  }
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const isMobile = useIsMobile('lg');
  const proposalsFetchStatus = useSelector(selectProposalsFetchStatus);
  const proposalsVotesStatus = useSelector(selectVotesFetchStatus);

  useEffect(() => {
    dispatch(getProposalsList());
    dispatch(getVotesList());
    dispatch(getUsersList());
    loadWeb3();
  }, []);

  useMaintainSession();
  // useTestFunction();

  useEffect(() => {
    const theme = sessionStorage.getItem('dao-theme');

    dispatch(setTheme(theme === THEME_MODES.DARK ? THEME_MODES.DARK : THEME_MODES.LIGHT));
  }, [dispatch]);

  // TODO: is that necessary?
  useEffect(() => {
    const checkProvider = async () => {
      if (window.ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3((window as any).ethereum);
      } else {
        window.web3 = new Web3(process.env.PROVIDER_URL || '');
      }
    };
    checkProvider();
  }, []);

  return (
    <StyledContainer>
      <MobileMenu />

      <StyledBox>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <DesktopMenu />
        </Box>

        <Box width="100%">
          {!isMobile && <BlockchainStatusContent />}

          {proposalsFetchStatus === FETCH_STATUSES.LOADING && proposalsVotesStatus === FETCH_STATUSES.LOADING && (
            <LoadingPage />
          )}

          {proposalsFetchStatus !== FETCH_STATUSES.LOADING &&
            proposalsVotesStatus !== FETCH_STATUSES.LOADING &&
            children}
        </Box>
      </StyledBox>

      <Footer />
    </StyledContainer>
  );
};

export default Layout;

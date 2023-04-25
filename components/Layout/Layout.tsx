import { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SideNav from 'components/Layout/SideNav/SideNav';
import Footer from 'components/Layout/Footer/Footer';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import Header from 'components/Layout/Header/Header';

import THEME_MODES from 'enums/themeModes';

import useMaintainSession from 'hooks/useMaintainSession';
// import useTestFunction from 'hooks/useTestFunction';

import FETCH_STATUSES from 'enums/fetchStatuses';

import { loadWeb3 } from 'utils/blockchain';

import { setTheme } from 'redux/slices/theme';
import { selectFetchStatus as selectProposalsFetchStatus, getProposalsList } from 'redux/slices/proposals';
import { selectFetchStatus as selectVotesFetchStatus, getVotesList } from 'redux/slices/votes';
import { getUsersList } from 'redux/slices/user';
import { setProvider } from 'redux/slices/main';
import { getTotalShares } from 'redux/slices/dao';

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

const ShutdownNotice = styled(Box)`
  color: white;
  padding: 20px;
  font-size: 24px;
  border: 2px solid white;
  background: linear-gradient(145deg, #fe0291 0%, #05e8fc 100%);
  font-weight: bold;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const proposalsFetchStatus = useSelector(selectProposalsFetchStatus);
  const proposalsVotesStatus = useSelector(selectVotesFetchStatus);

  useEffect(() => {
    dispatch(getTotalShares());
    dispatch(getProposalsList());
    dispatch(getVotesList());
    dispatch(getUsersList());
    loadWeb3();
  }, []);

  useMaintainSession();
  // useTestFunction();

  useEffect(() => {
    const theme = sessionStorage.getItem('dao-theme');

    dispatch(setTheme(theme === THEME_MODES.LIGHT ? THEME_MODES.LIGHT : THEME_MODES.DARK));
  }, [dispatch]);

  useEffect(() => {
    const checkProvider = async () => {
      if (window.ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        dispatch(setProvider(new ethers.providers.Web3Provider(window.ethereum as any)));
      }
    };
    checkProvider();
  }, []);

  return (
    <>
      <ShutdownNotice>
        THE DAO MAINTAINERS ARE CLOSING THE WEBSITE IN MAY 2023. THANK YOU FOR UNDERSTANDING.
      </ShutdownNotice>
      <Header />
      <StyledContainer>
        <StyledBox>
          <Box sx={{ display: { xs: 'none', lg: 'block' } }} mt={8}>
            <SideNav />
          </Box>

          {proposalsFetchStatus === FETCH_STATUSES.LOADING && proposalsVotesStatus === FETCH_STATUSES.LOADING && (
            <LoadingPage />
          )}

          {proposalsFetchStatus !== FETCH_STATUSES.LOADING &&
            proposalsVotesStatus !== FETCH_STATUSES.LOADING &&
            children}
        </StyledBox>

        <Footer />
      </StyledContainer>
    </>
  );
};

export default Layout;

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Identicon from 'identicon.js';
import Image from 'next/image';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import RecentActivityStatus from 'components/RecentActivityStatus/RecentActivityStatus';
import StatusChip from 'components/StatusChip/StatusChip';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import formatAddress from 'utils/formatAddress';

import useCheckBalance from 'hooks/useCheckBalance';
import useIsMobile from 'hooks/useIsMobile';

import { selectUserAddress, selectIsLoggedIn, selectUserShares, selectdckbBalance } from 'redux/slices/user';

import IndexerStatus from './IndexerStatus/IndexerStatus';

const StatusWrapper = styled(Box)`
  margin-left: 16px;
  border-right: 1px solid ${({ theme }) => theme.palette.colors.main4};
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 8px;
    margin-left: 0px;
  }
`;

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
  font-weight: 600;
`;

const ImageWrapper = styled(Box)`
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

const StyledImage = styled(Image)`
  border-radius: 100%;
`;

const StyledMenu = styled(Menu)`
  margin-top: 10px;

  .MuiPaper-root {
    border-radius: 10px;
  }
`;

const BlockchainStatusContent: FC = () => {
  const isMobile = useIsMobile('lg');

  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);
  const dckbBalance = useSelector(selectdckbBalance);

  const { isChecked } = useCheckBalance();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mt: { xs: 0, lg: 3 } }}>
      {(!isLoggedIn || !isMobile) && (
        <StatusWrapper>
          <IndexerStatus />
        </StatusWrapper>
      )}
      {!isMobile && (
        <StatusWrapper>
          <StatusChip title="Last page update:">
            <RecentActivityStatus />
          </StatusChip>
        </StatusWrapper>
      )}

      {isLoggedIn && (
        <Box ml={2}>
          <DAOPlainButton onClick={handleClick}>
            <Box display="flex" alignItems="center">
              <Typography variant="body1-bold">{formatAddress(userAddress)}</Typography>
              <ImageWrapper>
                <StyledImage
                  src={`data:image/png;base64,${new Identicon(userAddress, 30).toString()}`}
                  alt="header-logo"
                  height="40"
                  width="40"
                />
              </ImageWrapper>
            </Box>
          </DAOPlainButton>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <StatusChip title="dCKB balance:">
                {isChecked ? (
                  <Typography variant="body1-bold">{dckbBalance}</Typography>
                ) : (
                  <Box display="flex" alignItems="center">
                    <Box display="flex" alignItems="center" mr={1}>
                      <DAOCircleLoader size={20} />
                    </Box>
                    <Typography variant="body2">Checking</Typography>
                  </Box>
                )}
              </StatusChip>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {userShares > 0 && (
                <StatusChip title="Member shares:">
                  <Typography variant="body1-bold">{userShares}</Typography>
                </StatusChip>
              )}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {userShares === 0 && (
                <StatusChip title="Member status:">
                  <TypographyRed>Not a member</TypographyRed>
                </StatusChip>
              )}
            </MenuItem>
            {isMobile && (
              <MenuItem onClick={handleClose}>
                <IndexerStatus />
              </MenuItem>
            )}
            {isMobile && (
              <MenuItem onClick={handleClose}>
                <StatusChip title="Last page update:">
                  <RecentActivityStatus />
                </StatusChip>
              </MenuItem>
            )}
          </StyledMenu>
        </Box>
      )}

      {!isLoggedIn && (
        <Box sx={{ ml: { xs: 2, lg: 3 }, maxHeight: { xs: '40px', sm: 'auto' } }}>
          <ConnectWalletButton />
        </Box>
      )}
    </Box>
  );
};

export default BlockchainStatusContent;

import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import StatusChip from 'components/StatusChip/StatusChip';

import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';

import formatAddress from 'utils/formatAddress';
import { shannonsToCkb } from 'utils/formatShannons';

import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import useCheckBalance from 'hooks/useCheckBalance';

import RecentActivityStatus from 'components/RecentActivityStatus/RecentActivityStatus';

const StatusWrapper = styled(Box)`
  margin-left: 16px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 8px;
    margin-left: 0px;
  }
`;

const TypographyGreen = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 600;
`;

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col6};
  font-weight: 600;
`;

const TypographyYellow = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
  font-weight: 600;
`;

const BlockchainStatusContent: FC = () => {
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);

  const { molochBlock, layer2Block, molochError, molochLoading, layer2BlockLoading } = useCheckIndexerStatus();

  const { balance, isChecked } = useCheckBalance();

  return (
    <>
      <StatusWrapper>
        <StatusChip title="Indexer status:">
          {molochBlock === layer2Block && typeof layer2Block === 'number' && typeof molochBlock === 'number' && (
            <Box display="flex">
              <TypographyGreen>Online </TypographyGreen>
              <Typography variant="body1-bold" ml={1}>
                block: {molochBlock === layer2Block ? layer2Block : null}
              </Typography>
            </Box>
          )}

          {(typeof layer2Block !== 'number' || typeof molochBlock !== 'number') &&
            (layer2BlockLoading && molochLoading ? (
              <TypographyRed>Offline</TypographyRed>
            ) : (
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" mr={1}>
                  <DAOCircleLoader size={20} />
                </Box>
                <Typography variant="body2">Checking</Typography>
              </Box>
            ))}

          {!molochError ? (
            molochBlock !== layer2Block &&
            typeof layer2Block === 'number' &&
            typeof molochBlock === 'number' &&
            !Number.isNaN(layer2Block) &&
            !Number.isNaN(molochBlock) && (
              <>
                {layer2Block - molochBlock === 1 && (
                  <TypographyYellow>
                    lagging {'>>'} {layer2Block - molochBlock} block behind
                  </TypographyYellow>
                )}
                {layer2Block - molochBlock > 1 && (
                  <TypographyYellow>
                    lagging {'>>'} {layer2Block - molochBlock} blocks behind
                  </TypographyYellow>
                )}
              </>
            )
          ) : (
            <TypographyRed>INDEXER ERROR</TypographyRed>
          )}
        </StatusChip>
      </StatusWrapper>

      <StatusWrapper>
        <StatusChip title="Last page update:">
          <RecentActivityStatus />
        </StatusChip>
      </StatusWrapper>

      {isLoggedIn && (
        <StatusWrapper>
          <StatusChip title="User address:">
            <Typography variant="body1-bold">{formatAddress(userAddress)}</Typography>
          </StatusChip>
        </StatusWrapper>
      )}

      {isLoggedIn && (
        <StatusWrapper>
          <StatusChip title="dCKB balance:">
            {isChecked ? (
              <Typography variant="body1-bold">{shannonsToCkb(balance || 0)}</Typography>
            ) : (
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" mr={1}>
                  <DAOCircleLoader size={20} />
                </Box>
                <Typography variant="body2">Checking</Typography>
              </Box>
            )}
          </StatusChip>
        </StatusWrapper>
      )}

      {isLoggedIn && userShares > 0 && (
        <StatusWrapper>
          <StatusChip title="Member shares:">
            <Typography variant="body1-bold">{userShares}</Typography>
          </StatusChip>
        </StatusWrapper>
      )}

      {isLoggedIn && userShares === 0 && (
        <StatusWrapper>
          <StatusChip title="Member status:">
            <TypographyRed>Not a member</TypographyRed>
          </StatusChip>
        </StatusWrapper>
      )}
    </>
  );
};

export default BlockchainStatusContent;

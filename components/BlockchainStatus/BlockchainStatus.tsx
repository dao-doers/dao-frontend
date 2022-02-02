import { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import StatusChip from 'components/StatusChip/StatusChip';

import { selectUserAddress } from 'redux/slices/user';

import formatAddress from 'utils/formatAddress';
import { shannonsToCkb } from 'utils/formatShannons';

import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import useCheckBalance from 'hooks/useCheckBalance';

import Timer from 'components/Timer/Timer';
import useFetchProposals from 'hooks/useFetchProposals';
import RecentActivityStatus from 'components/RecentActivityStatus/RecentActivityStatus';

const MainWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const StatusWrapper = styled(Box)`
  margin-left: 16px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 8px;
    margin-left: 0px;
  }
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
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

const BlockchainStatus: FC = () => {
  const userAddress = useSelector(selectUserAddress);

  const { molochBlock, layer2Block, molochError, molochLoading, layer2BlockLoading } = useCheckIndexerStatus();

  const { balance, isChecked } = useCheckBalance();

  const refetchProposal = useFetchProposals();

  const timer = <Timer reset={refetchProposal.loading} />;

  const refetch = () => {
    refetchProposal.refetch();
  };

  return (
    <MainWrapper>
      <StatusWrapper>
        <StatusChip title="Indexer status:">
          {molochBlock === layer2Block && typeof layer2Block === 'number' && typeof molochBlock === 'number' && (
            <TypographyGreen>Online</TypographyGreen>
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

      {userAddress === '' && (
        <StatusWrapper>
          <ConnectWalletButton />
        </StatusWrapper>
      )}

      {userAddress !== '' && (
        <StatusWrapper>
          <StatusChip title="User address:">
            <TypographyBold>{formatAddress(userAddress)}</TypographyBold>
          </StatusChip>
        </StatusWrapper>
      )}

      {userAddress !== '' && isChecked && (
        <StatusWrapper>
          <StatusChip title="dCKB balance:">
            <TypographyBold>{shannonsToCkb(balance)}</TypographyBold>
          </StatusChip>
        </StatusWrapper>
      )}

      {userAddress !== '' && !isChecked && (
        <StatusWrapper>
          <StatusChip title="dCKB balance:">
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" mr={1}>
                <DAOCircleLoader size={20} />
              </Box>
              <Typography variant="body2">Checking</Typography>
            </Box>
          </StatusChip>
        </StatusWrapper>
      )}

      {userAddress !== '' && (
        <StatusWrapper>
          <StatusChip>
            <RecentActivityStatus refetch={refetch} timer={timer} />
          </StatusChip>
        </StatusWrapper>
      )}
    </MainWrapper>
  );
};

export default BlockchainStatus;

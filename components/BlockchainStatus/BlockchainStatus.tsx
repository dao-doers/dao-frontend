import { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';

import { selectUserAddress } from 'redux/slices/user';

import DAO_TILE_VARIANTS from 'enums/daoTileVariants';

import formatAddress from 'utils/formatAddress';
import { shannonsToCkb } from 'utils/formatShannons';

import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import useCheckBalance from 'hooks/useCheckBalance';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const BlockchainStatus: FC = () => {
  const userAddress = useSelector(selectUserAddress);

  const { molochBlock, layer2Block, molochError, molochLoading, loadingLayer2Block } = useCheckIndexerStatus();

  const { balance, isChecked } = useCheckBalance();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      width="100%"
      sx={{ flexDirection: { xs: 'column', md: 'row' }, pb: { xs: 4, md: 3 }, pt: { xs: 1, md: 4 } }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mr={4}
        sx={{ width: { xs: '100%', md: 'auto' }, mb: { xs: 2, md: 0 } }}
      >
        <Typography px={2}>Indexer connection status:</Typography>
        <Box height="40px">
          {molochBlock === layer2Block && typeof layer2Block === 'number' && typeof molochBlock === 'number' && (
            <DAOTile variant={DAO_TILE_VARIANTS.GREEN_BACKGROUND}>
              <Typography px={2}>online</Typography>
            </DAOTile>
          )}

          {(typeof layer2Block !== 'number' || typeof molochBlock !== 'number') &&
            (loadingLayer2Block && molochLoading ? (
              <DAOTile variant={DAO_TILE_VARIANTS.RED_BACKGROUND}>
                <Typography px={2}>offline</Typography>
              </DAOTile>
            ) : (
              <DAOTile variant={DAO_TILE_VARIANTS.GREY_SHADOW}>
                <Typography px={2}>Processing</Typography>
              </DAOTile>
            ))}

          {!molochError ? (
            molochBlock !== layer2Block &&
            typeof layer2Block === 'number' &&
            typeof molochBlock === 'number' &&
            !Number.isNaN(layer2Block) &&
            !Number.isNaN(molochBlock) && (
              <DAOTile variant={DAO_TILE_VARIANTS.YELLOW_BACKGROUND}>
                <>
                  {layer2Block - molochBlock === 1 && (
                    <Typography px={2}>
                      lagging {'>>'} {layer2Block - molochBlock} block behind
                    </Typography>
                  )}
                  {layer2Block - molochBlock > 1 && (
                    <Typography px={2}>
                      lagging {'>>'} {layer2Block - molochBlock} blocks behind
                    </Typography>
                  )}
                </>
              </DAOTile>
            )
          ) : (
            <DAOTile variant={DAO_TILE_VARIANTS.RED_BACKGROUND}>
              <Typography px={2}>INDEXER ERROR</Typography>
            </DAOTile>
          )}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }}>
        {userAddress === '' ? (
          <ConnectWalletButton />
        ) : (
          <Box display="flex" justifyContent="flex-end" alignItems="center" height="40px" width="100%">
            <Typography noWrap>User address: </Typography>
            <Box height="40px" ml={2}>
              <DAOTile variant={DAO_TILE_VARIANTS.GRADIENT_OUTLINE}>
                <TypographyBold px={2}>{formatAddress(userAddress)}</TypographyBold>
              </DAOTile>
            </Box>
            <Typography ml={3} noWrap>
              {isChecked ? (
                balance && (
                  <>
                    <b>{shannonsToCkb(balance)}</b> dCKB
                  </>
                )
              ) : (
                <Box display="flex" alignItems="center">
                  <Box display="flex" alignItems="center" mr={2}>
                    <DAOCircleLoader size={20} />
                  </Box>
                  Checking balance
                </Box>
              )}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BlockchainStatus;

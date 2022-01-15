import { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import { selectUserAddress } from 'redux/slices/user';

import DAO_TILE_VARIANTS from 'enums/daoTileVariants';

import formatAddress from 'utils/formatAddress';

import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const BlockchainStatus: FC = () => {
  const userAddress = useSelector(selectUserAddress);

  const { molochBlock, layer2Block } = useCheckIndexerStatus();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      width="100%"
      sx={{ flexDirection: { xs: 'column', md: 'row' }, pb: { xs: 2, md: 3 }, pt: { xs: 1, md: 4 } }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mr={4}
        sx={{ width: { xs: '100%', md: 'auto' }, mb: { xs: 2, md: 0 } }}
      >
        <Typography px={2}>Indexer status:</Typography>
        <Box height="40px">
          {molochBlock === layer2Block && typeof layer2Block === 'number' && typeof molochBlock === 'number' && (
            <DAOTile variant={DAO_TILE_VARIANTS.GREEN_BACKGROUND}>
              <Typography px={2}>online</Typography>
            </DAOTile>
          )}

          {(typeof layer2Block !== 'number' || typeof molochBlock !== 'number') && (
            <DAOTile variant={DAO_TILE_VARIANTS.RED_BACKGROUND}>
              <Typography px={2}>offline</Typography>
            </DAOTile>
          )}

          {molochBlock !== layer2Block &&
            typeof layer2Block === 'number' &&
            typeof molochBlock === 'number' &&
            !Number.isNaN(layer2Block) &&
            !Number.isNaN(molochBlock) && (
              <DAOTile variant={DAO_TILE_VARIANTS.YELLOW_BACKGROUND}>
                <>
                  {layer2Block - molochBlock === 1 && (
                    <Typography px={2}>{layer2Block - molochBlock} block behind</Typography>
                  )}
                  {layer2Block - molochBlock > 1 && (
                    <Typography px={2}>{layer2Block - molochBlock} blocks behind</Typography>
                  )}
                </>
              </DAOTile>
            )}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }}>
        {userAddress === '' ? (
          <ConnectWalletButton />
        ) : (
          <>
            <Typography noWrap>User address: </Typography>
            <Box ml={2}>
              <DAOTile variant={DAO_TILE_VARIANTS.GRADIENT_OUTLINE}>
                <TypographyBold px={2}>{formatAddress(userAddress)}</TypographyBold>
              </DAOTile>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlockchainStatus;

/* eslint-disable no-nested-ternary */
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
import { useBlock } from 'components/hooks/web3';
import { useQuery } from '@apollo/react-hooks';
import { GET_BLOCK } from 'services/getBlock';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const BlockchainStatus: FC = () => {
  const userAddress = useSelector(selectUserAddress);
  const { block, loading } = useBlock();
  const { error, data: molochBlock } = useQuery(GET_BLOCK, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 10 * 3000,
  });

  return (
    <Box display="flex" justifyContent="flex-end" py={4} width="100%">
      <Box display="flex" alignItems="center" mr={4}>
        <Typography px={2}>Indexer status:</Typography>
        {loading ? (
          molochBlock?._meta.block.number === block ? (
            <Box>
              {!error ? (
                <DAOTile variant={DAO_TILE_VARIANTS.GREEN_OUTLINE}>
                  <Typography px={2}>online</Typography>
                </DAOTile>
              ) : (
                <DAOTile variant={DAO_TILE_VARIANTS.RED_OUTLINE}>
                  <Typography px={2}>NETWORK ERROR</Typography>
                </DAOTile>
              )}
            </Box>
          ) : (
            <Box>
              <DAOTile variant={DAO_TILE_VARIANTS.RED_OUTLINE}>
                <Typography px={2}>
                  offline <DoubleArrowOutlinedIcon size="1em" style={{ marginBottom: '-6px' }} />{' '}
                  {molochBlock?._meta.block.number !== undefined &&
                  block !== null &&
                  typeof block === 'number' &&
                  typeof molochBlock?._meta.block.number === 'number' &&
                  !Number.isNaN(block) &&
                  !Number.isNaN(molochBlock?._meta.block.number) ? (
                    <>{block - molochBlock?._meta.block.number} blocks behind</>
                  ) : (
                    ''
                  )}{' '}
                </Typography>
              </DAOTile>
            </Box>
          )
        ) : (
          <Box display="flex" alignItems="center" mr={2}>
            <DAOCircleLoader size={20} />
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center">
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

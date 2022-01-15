/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-var-requires */
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
import { useInterval } from 'hooks/useInterval';
import { GET_BLOCK } from 'services/getBlock';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const BlockchainStatus: FC = () => {
  const userAddress = useSelector(selectUserAddress);
  const { block } = useBlock();
  const { error, data: molochBlock, refetch: isRefetchingMolochBlock } = useQuery(GET_BLOCK);

  useInterval(() => {
    isRefetchingMolochBlock();
  }, 10 * 3000);

  console.log('molochBlock', molochBlock?._meta.block.number);
  console.log('block', block);
  console.log('result', block - molochBlock?._meta.block.number);
  return (
    <Box display="flex" justifyContent="flex-end" py={4} width="100%">
      <Box display="flex" alignItems="center" mr={4}>
        <Typography px={2}>Indexer status:</Typography>
        {molochBlock?._meta.block.number === block ? (
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

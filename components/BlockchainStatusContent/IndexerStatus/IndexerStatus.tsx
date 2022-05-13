import React, { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import StatusChip from 'components/StatusChip/StatusChip';

import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import useIsMobile from 'hooks/useIsMobile';

const TypographyGreen = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 500;
`;

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
  font-weight: 500;
  white-space: nowrap;
`;

const TypographyYellow = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col3};
  font-weight: 500;
  white-space: nowrap;
`;

const IndexerStatus: FC = () => {
  const isMobile = useIsMobile('md');

  const { molochBlock, layer2Block, molochError, molochLoading, layer2BlockLoading } = useCheckIndexerStatus();

  console.log(molochBlock, 'molochBlock');
  console.log(layer2Block, 'layer2Block');

  return (
    <StatusChip title="Indexer status:">
      {molochBlock === layer2Block && typeof layer2Block === 'number' && typeof molochBlock === 'number' && (
        <Box display="flex">
          <TypographyGreen>Online </TypographyGreen>
          {!isMobile && (
            <Typography variant="body1-bold" ml={1} noWrap>
              block: {molochBlock === layer2Block ? layer2Block : null}
            </Typography>
          )}
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
  );
};

export default IndexerStatus;

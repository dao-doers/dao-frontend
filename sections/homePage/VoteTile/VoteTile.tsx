import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';

import DAO_TILE_VARIANTS from 'enums/daoTileVariants';

import formatAddress from 'utils/formatAddress';
import { formatSeconds } from 'utils/formatDate';

const TypographyAgree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 600;
`;

const TypographyDisagree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 600;
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const VoteTile: FC<any> = ({ vote }) => {
  const formatTitle = textObject => {
    // TODO: clean DB bacause returned objects are not same
    if (textObject.includes('title', 2)) {
      return JSON.parse(textObject).title;
    }
  };

  return (
    <Box my={3}>
      <DAOTile variant={DAO_TILE_VARIANTS.GREY_SHADOW}>
        <Box width="100%" height="100%" px={3} pb={3} pt={1.5}>
          <Typography variant="body2" align="right">
            {formatSeconds(vote.createdAt)}
          </Typography>

          <Typography component="h6" variant="h6" paragraph>
            {formatTitle(vote.proposal.details)}
          </Typography>
          <Box display="flex" alignItems="center" width="100%">
            <Box width="50%">
              <TypographyBold>User address:</TypographyBold>
              <Typography>{formatAddress(vote.memberAddress)}</Typography>
            </Box>

            <Box width="50%">
              <TypographyBold>Voted on:</TypographyBold>
              {vote.uintVote === 1 && <TypographyAgree>Yes</TypographyAgree>}
              {vote.uintVote === 2 && <TypographyDisagree>No</TypographyDisagree>}
            </Box>
          </Box>
        </Box>
      </DAOTile>
    </Box>
  );
};

export default VoteTile;

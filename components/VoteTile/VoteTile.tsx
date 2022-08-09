import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';
import Link from 'components/Link/Link';

import formatAddress from 'utils/formatAddress';
import { formatSeconds } from 'utils/formatDate';
import { APP_ROUTES } from 'utils/routes';
import getFormattedDetailsFromOnchainDetailsString from 'utils/format';

const TypographyTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const TypographyAgree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
`;

const TypographyDisagree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
`;

const TypographySmall = styled(Typography)`
  font-size: 12px;
`;

const VoteTile: FC<any> = ({ vote }) => {
  const formatTitle = (textObject: any): any => {
    if (textObject.includes('title', 2)) {
      return getFormattedDetailsFromOnchainDetailsString(textObject).title;
    }

    return undefined;
  };

  return (
    <Box mb={3} width="100%">
      <DAOTile variant="greyShadow">
        <Box p={3} sx={{ width: '-webkit-fill-available' }}>
          <TypographySmall align="right" paragraph>
            {formatSeconds(vote.createdAt)}
          </TypographySmall>

          <Link internal href={`${APP_ROUTES.PROPOSALS}/${vote.proposal.id}`}>
            <TypographyTitle variant="h6" paragraph>
              {formatTitle(vote.proposal.details)}
            </TypographyTitle>
          </Link>

          <Box display="flex" alignItems="center" width="100%">
            <Box width="60%">
              <Typography variant="body1-bold">User address:</Typography>
              <Typography>{formatAddress(vote.memberAddress)}</Typography>
            </Box>

            <Box width="40%">
              <Typography variant="body1-bold">Voted on:</Typography>
              {vote.uintVote === 1 && <TypographyAgree>Agree</TypographyAgree>}
              {vote.uintVote === 2 && <TypographyDisagree>Disagree</TypographyDisagree>}
            </Box>
          </Box>
        </Box>
      </DAOTile>
    </Box>
  );
};

export default VoteTile;

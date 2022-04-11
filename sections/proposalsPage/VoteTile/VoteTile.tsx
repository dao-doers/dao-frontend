import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';
import Link from 'components/Link/Link';

import formatAddress from 'utils/formatAddress';
import { formatSeconds } from 'utils/formatDate';
import { APP_ROUTES } from 'utils/routes';

const TypographyTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const TypographyAgree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 600;
`;

const TypographyDisagree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 600;
`;

const TypographySmall = styled(Typography)`
  font-size: 12px;
`;

const VoteTile: FC<any> = ({ vote }) => {
  const formatTitle = (textObject: any): any => {
    if (textObject.includes('title', 2)) {
      return JSON.parse(textObject).title;
    }

    return undefined;
  };

  return (
    <Box mb={3}>
      <DAOTile variant="greyShadow">
        <Box width="100%" height="100%" px={3} pb={3} pt={1.5}>
          <TypographySmall align="right" mb={1}>
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

import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';

import DAOTile from 'components/DAOTile/DAOTile';
import Link from 'components/Link/Link';

import { formatSeconds } from 'utils/formatDate';
import { APP_ROUTES } from 'utils/routes';

import DetailsAccordion from './DetailsAccordion/DetailsAccordion';
import VoteAccordion from './VoteAccordion/VoteAccordion';

const StyledLanguageIcon = styled(LanguageIcon)`
  cursor: pointer;
  margin-right: 10px;
  font-size: 20px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  color: #2ea5e8;
  cursor: pointer;
  font-size: 20px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const TypographyTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const TypographySmall = styled(Typography)`
  font-size: 12px;
`;

const TypographyDescription = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

const ProposalTile: FC<any> = ({ proposal, mbProps }) => {
  const router = useRouter();

  const [nullObject, setNullObject] = useState(true);
  const [formattedTitle, setFormattedTitle] = useState('');
  const [formattedDescr, setFormattedDescr] = useState('');
  const [formattedWebsite, setFormattedWebsite] = useState('');

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const formatDetails = (textObject: string) => {
    if (!isJSON(textObject)) {
      setNullObject(true);
    } else {
      setFormattedTitle(JSON.parse(textObject).title);
      setFormattedDescr(JSON.parse(textObject).description);
      setFormattedWebsite(JSON.parse(textObject).link);
      setNullObject(false);
    }
  };

  useEffect(() => {
    formatDetails(proposal.details);
  }, []);

  if (nullObject) {
    return null;
  }

  return (
    <Box mb={mbProps}>
      <DAOTile variant="greyShadow">
        <Box p={3} width="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TypographySmall align="right" paragraph>
              {formatSeconds(proposal.createdAt)}
            </TypographySmall>
          </Box>

          <Box pb={4}>
            <Link internal href={`${APP_ROUTES.PROPOSALS}/${proposal.id}`}>
              <TypographyTitle variant="h3">{formattedTitle}</TypographyTitle>
            </Link>
          </Box>

          {router.pathname.includes('proposals') ? (
            <Typography variant="subtitle2" paragraph>
              {formattedDescr}
            </Typography>
          ) : (
            <TypographyDescription variant="subtitle2" paragraph>
              {formattedDescr}
            </TypographyDescription>
          )}

          <DetailsAccordion proposal={proposal} />
          <VoteAccordion proposal={proposal} />
        </Box>
      </DAOTile>
    </Box>
  );
};

export default ProposalTile;

import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';

import DAOTile from 'components/DAOTile/DAOTile';
import Link from 'components/Link/Link';

import DetailsAccordion from 'sections/proposalsPage/DetailsAccordion/DetailsAccordion';
import VoteAccordion from 'sections/proposalsPage/VoteAccordion/VoteAccordion';

import { formatSeconds } from 'utils/formatDate';
import { APP_ROUTES } from 'utils/routes';

const StyledExitToAppIcon = styled(ExitToAppIcon)`
  cursor: pointer;
  margin-right: 10px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const StyledLanguageIcon = styled(LanguageIcon)`
  cursor: pointer;
  margin-right: 10px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  color: #2ea5e8;
  cursor: pointer;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const TypographyTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-weight: 600;
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
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const ProposalTile: FC<any> = ({ proposal }) => {
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
    <Box sx={{ mb: { xs: 0, md: 3 } }}>
      <DAOTile variant="greyShadow">
        <Box width="100%" height="100%" p={3}>
          <TypographySmall align="right" paragraph>
            {formatSeconds(proposal.createdAt)}
          </TypographySmall>

          <Box display="flex" justifyContent="space-between" alignItems="center" pb={4}>
            <Link internal href={`${APP_ROUTES.PROPOSALS}/${proposal.id}`}>
              <TypographyTitle variant="h3">{formattedTitle}</TypographyTitle>
            </Link>

            <Box display="flex">
              <Tooltip title="Go to proposal page" placement="top">
                <Link internal href={`${APP_ROUTES.PROPOSALS}/${proposal.id}`}>
                  <StyledExitToAppIcon />
                </Link>
              </Tooltip>
              <Tooltip title="Go to project website" placement="top">
                <Link href={`https://${formattedWebsite}`} target="_blank">
                  <StyledLanguageIcon />
                </Link>
              </Tooltip>
              <Tooltip title="Share this proposal on Twitter" placement="top">
                <Link
                  href={`https://twitter.com/share?url=${process.env.APP_URL}proposal/${proposal.id}&text=${formattedTitle}`}
                  target="_blank"
                >
                  <StyledTwitterIcon />
                </Link>
              </Tooltip>
            </Box>
          </Box>

          {router.pathname.includes('create') ? (
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

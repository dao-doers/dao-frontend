import { FC, useState, useEffect } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';

import DAOTile from 'components/DAOTile/DAOTile';
import Link from 'components/Link';

import Details from 'sections/homePage/Details/Details';
import VoteSection from 'sections/homePage/VoteSection/VoteSection';

import { formatSeconds } from 'utils/formatDate';

const StyledReadMoreIcon = styled(ReadMoreIcon)`
  cursor: pointer;
  margin-right: 10px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  margin-right: 10px;
  cursor: pointer;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const StyledLanguageIcon = styled(LanguageIcon)`
  color: ${({ theme }) => theme.palette.colors.col5};
  cursor: pointer;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 20px;
  }
`;

const ProposalTile: FC<any> = ({ proposal }) => {
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
    <Box mb={3}>
      <DAOTile variant="greyShadow">
        <Box width="100%" height="100%" p={3}>
          <Typography align="right" paragraph>
            {formatSeconds(proposal.createdAt)}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" pb={4}>
            <Typography component="h3" variant="h3">
              {formattedTitle}
            </Typography>
            <Box display="flex">
              <Tooltip title="Go to proposal page" placement="top">
                <Link internal href={`${process.env.APP_URL}proposal/${proposal.id}`}>
                  <StyledReadMoreIcon />
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
              <Tooltip title="Go to projekt website" placement="top">
                <Link href={`https://${formattedWebsite}`} target="_blank">
                  <StyledLanguageIcon />
                </Link>
              </Tooltip>
            </Box>
          </Box>

          <Typography variant="subtitle2" paragraph>
            {formattedDescr}
          </Typography>

          <Details proposal={proposal} />
          <VoteSection proposal={proposal} />
        </Box>
      </DAOTile>
    </Box>
  );
};

export default ProposalTile;

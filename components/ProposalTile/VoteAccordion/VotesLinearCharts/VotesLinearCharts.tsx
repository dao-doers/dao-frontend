/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Typography from '@mui/material/Typography';

import LinearChart from 'components/LinearChart/LinearChart';

interface VotesLinearChartsProps {
  yesVotes: number;
  noVotes: number;
}

const TypographyAgree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
`;

const TypographyDisagree = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
`;

const VotesLinearCharts: FC<VotesLinearChartsProps> = ({ yesVotes, noVotes }) => {
  return (
    <Box>
      <Typography variant="subtitle2-bold" paragraph>
        Votes:{' '}
      </Typography>
      {yesVotes + noVotes > 0 && (
        <Box width="100%" pb={2}>
          <Typography>
            Agreed: {yesVotes} ( {(yesVotes / (yesVotes + noVotes)) * 100}% )
          </Typography>
          <Box mt={1} mb={2}>
            <LinearChart type="agree" main={yesVotes} all={yesVotes + noVotes} />
          </Box>

          <Typography>
            Disagreed: {noVotes} ( {(noVotes / (yesVotes + noVotes)) * 100}
            %)
          </Typography>
          <Box mt={1} mb={2}>
            <LinearChart type="disagree" main={noVotes} all={yesVotes + noVotes} />
          </Box>
        </Box>
      )}
      {yesVotes + noVotes === 0 && (
        <Box display="flex" alignItems="center" width="100%">
          <PlaylistRemoveIcon />
          <Typography ml={1}>No votes</Typography>
        </Box>
      )}
    </Box>
  );
};

export default VotesLinearCharts;

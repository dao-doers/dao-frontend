import { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Counter from 'components/Counter/Counter';
import DAOTile from 'components/DAOTile/DAOTile';
import TooltipIcon from 'components/TooltipIcon';

interface GracePeriodProps {
  votingPeriodEnds: string;
  gracePeriodEnds: string;
}

const GracePeriod: FC<GracePeriodProps> = ({ votingPeriodEnds, gracePeriodEnds }) => {
  const currentTime = new Date().getTime() / 1000;

  return (
    <Box>
      {currentTime > Number(votingPeriodEnds) && currentTime < Number(gracePeriodEnds) && (
        <>
          <DAOTile variant="gradientOutline">
            <Typography align="center" p={1}>
              Proposal is in Grace Period.
              <TooltipIcon>
                <Typography variant="body2">
                  Voting is over, and the Proposal is set to pass or fail depending on the votes cast during Voting.
                  Members who voted No, and have no other pending Yes votes, can ragequit during this period.
                </Typography>
              </TooltipIcon>
            </Typography>
          </DAOTile>

          <Box display="flex" justifyContent="space-between" width="100%" mt={3} mb={2}>
            <Typography width="100%">Grace Period Ends In:</Typography>
            <Counter time={Number(gracePeriodEnds)} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default GracePeriod;

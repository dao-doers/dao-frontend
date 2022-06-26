import { FC } from 'react';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';

interface FinishedProps {
  didPass: boolean;
}

const Finished: FC<FinishedProps> = ({ didPass }) => {
  return (
    <>
      {didPass === true && (
        <DAOTile variant="successBox">
          <Typography align="center" p={1}>
            Proposal has been approved and processed.
          </Typography>
        </DAOTile>
      )}
      {didPass === false && (
        <DAOTile variant="errorBox">
          <Typography align="center" p={1}>
            Proposal has been rejected and processed.
          </Typography>
        </DAOTile>
      )}
    </>
  );
};

export default Finished;

import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

import { selectProposalType, setProposalType } from 'redux/slices/main';

const FormTypeButtons: FC<any> = () => {
  const dispatch = useDispatch();

  const proposalType = useSelector(selectProposalType);

  const handleSetProposalType = (type: string) => {
    dispatch(setProposalType(type));
  };

  return (
    <Box sx={{ mb: { xs: 0, md: 3 }, mt: { xs: 1.5, md: 3 } }}>
      <DAOTile variant={proposalType === CREATE_PROPOSAL_TYPE.NORMAL ? 'gradientOutline' : null}>
        <Box
          width="100%"
          height="100%"
          p={3}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleSetProposalType(CREATE_PROPOSAL_TYPE.NORMAL)}
        >
          <Typography variant="h6-bold" align="center" paragraph>
            Request for joining DAO
          </Typography>
          <Typography align="center">Tributing capital and requesting new shares to join the DAO</Typography>
        </Box>
      </DAOTile>

      <Box my={2}>
        <DAOTile variant={proposalType === CREATE_PROPOSAL_TYPE.WITH_FUNDING ? 'gradientOutline' : null}>
          <Box
            width="100%"
            height="100%"
            p={3}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleSetProposalType(CREATE_PROPOSAL_TYPE.WITH_FUNDING)}
          >
            <Typography variant="h6-bold" align="center" paragraph>
              Request for project funding
            </Typography>
            <Typography align="center">
              Tributing spoils or requesting funds from the DAO to work on internal projects and improvements
            </Typography>
          </Box>
        </DAOTile>
      </Box>

      <DAOTile variant={proposalType === CREATE_PROPOSAL_TYPE.KICK ? 'gradientOutline' : null}>
        <Box
          width="100%"
          height="100%"
          p={3}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleSetProposalType(CREATE_PROPOSAL_TYPE.KICK)}
        >
          <Typography variant="h6-bold" align="center" paragraph>
            Guild kick
          </Typography>
          <Typography align="center">Request to forcibly remove a malicious member through a vote</Typography>
        </Box>
      </DAOTile>
    </Box>
  );
};

export default FormTypeButtons;

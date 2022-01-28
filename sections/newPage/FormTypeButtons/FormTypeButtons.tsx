import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';

import NEW_PROPOSAL_TYPE from 'enums/newProposalType';

import { selectNewProposalType, setNewProposalType } from 'redux/slices/newProposal';

const FormTypeButtons: FC<any> = () => {
  const dispatch = useDispatch();

  const newProposalType = useSelector(selectNewProposalType);

  const handleSetProposalType = (type: string) => {
    dispatch(setNewProposalType(type));
  };

  return (
    <Box my={3}>
      <DAOTile variant={newProposalType === NEW_PROPOSAL_TYPE.NORMAL ? gradientOutline : 'greyOutline'}>
        <Box
          width="100%"
          height="100%"
          p={3}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleSetProposalType(NEW_PROPOSAL_TYPE.NORMAL)}
        >
          <Typography variant="h6" align="center" paragraph>
            New proposal
          </Typography>
          <Typography align="center">New member proposal description</Typography>
        </Box>
      </DAOTile>

      <Box my={3}>
        <DAOTile variant={newProposalType === NEW_PROPOSAL_TYPE.WITH_FUNDING ? gradientOutline : 'greyOutline'}>
          <Box
            width="100%"
            height="100%"
            p={3}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleSetProposalType(NEW_PROPOSAL_TYPE.WITH_FUNDING)}
          >
            <Typography variant="h6" align="center" paragraph>
              New proposal with funding
            </Typography>
            <Typography align="center">New member proposal with funding description</Typography>
          </Box>
        </DAOTile>
      </Box>

      <DAOTile variant="greyShadow">
        <Box width="100%" height="100%" p={3} sx={{ cursor: 'pointer' }}>
          <Typography variant="h6" align="center" paragraph>
            Guild kick
          </Typography>
          <Typography align="center">(Available soon!)</Typography>
        </Box>
      </DAOTile>
    </Box>
  );
};

export default FormTypeButtons;

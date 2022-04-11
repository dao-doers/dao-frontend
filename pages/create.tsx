import type { NextPage } from 'next';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout/Layout';

import FormTypeButtons from 'sections/createPage/FormTypeButtons/FormTypeButtons';
import FundProjectForm from 'sections/createPage/FundProjectForm/FundProjectForm';
import GuildKickForm from 'sections/createPage/GuildKickForm/GuildKickForm';
import JoinDaoForm from 'sections/createPage/JoinDaoForm/JoinDaoForm';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

import { selectProposalType } from 'redux/slices/createProposal';

const CreatePage: FC<NextPage> = () => {
  const proposalType = useSelector(selectProposalType);

  return (
    <Layout>
      <Box
        mt={4}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between', xl: 'normal' },
        }}
      >
        <Typography
          variant="h3-bold"
          mt={1}
          sx={{ display: { xs: 'block', md: 'none' }, textAlign: { xs: 'center', md: 'left' } }}
        >
          Create new proposal
        </Typography>
        <Box sx={{ width: { xs: '100%', md: '40%' }, pl: { xs: 0, md: 4 } }}>
          <FormTypeButtons />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          {proposalType === CREATE_PROPOSAL_TYPE.NORMAL && <JoinDaoForm />}
          {proposalType === CREATE_PROPOSAL_TYPE.WITH_FUNDING && <FundProjectForm />}
          {proposalType === CREATE_PROPOSAL_TYPE.KICK && <GuildKickForm />}
        </Box>
      </Box>
    </Layout>
  );
};

export default CreatePage;

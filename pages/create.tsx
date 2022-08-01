import type { NextPage } from 'next';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout/Layout';

import FormTypeButtons from 'sections/createPage/FormTypeButtons/FormTypeButtons';
import GuildKickForm from 'sections/createPage/GuildKickForm/GuildKickForm';
import JoinDaoForm from 'sections/createPage/JoinDaoForm/JoinDaoForm';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

import { selectProposalType } from 'redux/slices/main';
import WhitelistTokenForm from 'sections/createPage/WhitelistTokenForm';

const CreatePage: FC<NextPage> = () => {
  const proposalType = useSelector(selectProposalType);

  return (
    <Layout>
      <Box
        mt={4}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between', xl: 'center' },
        }}
        width="100%"
      >
        <Typography
          variant="h3-bold"
          mt={1}
          mb={3}
          sx={{ display: { xs: 'block', md: 'none' }, textAlign: { xs: 'center', md: 'left' } }}
        >
          Create new proposal
        </Typography>
        <Box sx={{ width: { xs: '100%', md: '45%', lg: '40%' }, pl: { xs: 0, lg: 4 } }}>
          <FormTypeButtons />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%', lg: '55%' } }}>
          {proposalType === CREATE_PROPOSAL_TYPE.NORMAL && <JoinDaoForm />}
          {proposalType === CREATE_PROPOSAL_TYPE.WHITELIST_TOKEN && <WhitelistTokenForm />}
          {proposalType === CREATE_PROPOSAL_TYPE.KICK && <GuildKickForm />}
        </Box>
      </Box>
    </Layout>
  );
};

export default CreatePage;

import type { NextPage } from 'next';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout/Layout';

import FormTypeButtons from 'sections/createPage/FormTypeButtons/FormTypeButtons';
import CreateProposalForm from 'sections/createPage/CreateProposalForm/CreateProposalForm';
import CreateFundingForm from 'sections/createPage/CreateFundingForm/CreateFundingForm';
import GuildKickForm from 'sections/createPage/GuildKickForm/GuildKickForm';

import { selectProposalType } from 'redux/slices/createProposal';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const CreatePage: FC<NextPage> = () => {
  const proposalType = useSelector(selectProposalType);

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { md: 'space-between', xl: 'normal' },
        }}
      >
        <TypographyBold variant="h4" mb={1} sx={{ display: { xs: 'block', md: 'none' } }}>
          Create new proposal
        </TypographyBold>
        <Box sx={{ width: { xs: '100%', md: '40%' }, pl: { xs: 0, md: 4 }, mb: { xs: 3, md: 0 } }}>
          <FormTypeButtons />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          {proposalType === CREATE_PROPOSAL_TYPE.NORMAL && <CreateProposalForm />}
          {proposalType === CREATE_PROPOSAL_TYPE.WITH_FUNDING && <CreateFundingForm />}
          {proposalType === CREATE_PROPOSAL_TYPE.KICK && <GuildKickForm />}
        </Box>
      </Box>
    </Layout>
  );
};

export default CreatePage;

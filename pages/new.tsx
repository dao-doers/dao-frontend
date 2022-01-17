import type { NextPage } from 'next';
import React, { FC } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout/Layout';

import FormTypeButtons from 'sections/newPage/FormTypeButtons/FormTypeButtons';
import NewProposalForm from 'sections/newPage/NewProposalForm/NewProposalForm';
import NewFundingForm from 'sections/newPage/NewFundingForm/NewFundingForm';
import GuildKickForm from 'sections/newPage/GuildKickForm/GuildKickForm';

import config from 'config/config';

import { selectNewProposalType } from 'redux/slices/newProposal';

import NEW_PROPOSAL_TYPE from 'enums/newProposalType';

const client = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const NewProposal: FC<NextPage> = () => {
  const newProposalType = useSelector(selectNewProposalType);
  return (
    <ApolloProvider client={client as any}>
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
            {newProposalType === NEW_PROPOSAL_TYPE.NORMAL && <NewProposalForm />}
            {newProposalType === NEW_PROPOSAL_TYPE.WITH_FUNDING && <NewFundingForm />}
            {newProposalType === NEW_PROPOSAL_TYPE.KICK && <GuildKickForm />}
          </Box>
        </Box>
      </Layout>
    </ApolloProvider>
  );
};

export default NewProposal;

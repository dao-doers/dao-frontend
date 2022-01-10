import React, { FC } from 'react';
import useFetchProposals from 'hooks/useFetchProposals';
import useFetchVotes from 'hooks/useFetchVotes';

// TODO: move that to redux middleware or sth?
const FetchDataComponent: FC = () => {
  useFetchProposals();
  useFetchVotes();

  return <div />;
};

export default FetchDataComponent;

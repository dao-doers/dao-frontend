import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';

import { gql } from 'apollo-boost';

import { setVotes } from 'redux/slices/votes';

const useFetchVotes = () => {
  const dispatch = useDispatch();

  const VOTE_DATA = `
  id
  createdAt
  uintVote
  molochAddress
  memberAddress
  proposal {
    details
    id
  }
  member {
    shares
  }
`;

  const expression = {
    GET_VOTES: `
      query addressVotes($first: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
        votes(first: $first, skip: $skip, orderBy:$orderBy, orderDirection:$orderDirection) {
          ${VOTE_DATA}
        }
      }
    `,
  };

  const { loading, error, data } = useQuery(gql(expression.GET_VOTES));

  useEffect(() => {
    if (!loading && data) {
      dispatch(setVotes(data.votes));
    }
  }, [loading, error, data]);

  return null;
};

export default useFetchVotes;

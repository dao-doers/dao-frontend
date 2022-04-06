import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import FETCH_STATUSES from 'enums/fetchStatuses';

import { setVotes, setFetchStatus, selectFetchStatus } from 'redux/slices/votes';

const useFetchVotes = () => {
  const dispatch = useDispatch();

  const fetchStatus = useSelector(selectFetchStatus);

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
    if (!loading && data && fetchStatus !== FETCH_STATUSES.SUCCESS) {
      dispatch(setVotes(data.votes));
      dispatch(setFetchStatus(FETCH_STATUSES.SUCCESS));
    }
  }, [loading, error, data]);

  return { loading };
};

export default useFetchVotes;

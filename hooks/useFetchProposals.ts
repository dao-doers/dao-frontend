import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import FETCH_STATUSES from 'enums/fetchStatuses';

import { setProposals, setFetchStatus, selectFetchStatus } from 'redux/slices/proposals';

const useFetchProposals = () => {
  const dispatch = useDispatch();

  const fetchStatus = useSelector(selectFetchStatus);

  const PROPOSAL_DATA = `
id
createdAt
proposalIndex
proposalId
moloch {
  id
}
molochAddress
memberAddress
delegateKey
applicant
proposer
sponsor
sharesRequested
lootRequested
tributeOffered
tributeToken
tributeTokenSymbol
tributeTokenDecimals
paymentRequested
paymentToken
paymentTokenSymbol
paymentTokenDecimals
startingPeriod
yesVotes
noVotes
sponsored
sponsoredAt
processed
didPass
cancelled
aborted
whitelist
guildkick
newMember
trade
details
maxTotalSharesAndLootAtYesVote
votes {
  uintVote
  id
  member {
    id
    memberAddress
  }
}
yesShares
noShares
votingPeriodStarts
votingPeriodEnds
gracePeriodEnds
molochVersion
`;
  const PROPOSAL_ORDER = '$first: Int, $skip: Int, $orderBy: String, $orderDirection: String';
  const PROPOSAL_SORT = 'first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection';

  const expression = {
    QUERY_PROPOSALS: `
      query addressProposals(${PROPOSAL_ORDER}) {
        proposals(${PROPOSAL_SORT}) {
          ${PROPOSAL_DATA}
        }
      }
    `,
  };

  const { loading, error, data, refetch } = useQuery(gql(expression.QUERY_PROPOSALS), {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
  });

  useEffect(() => {
    if (!loading && !error && fetchStatus !== FETCH_STATUSES.SUCCESS) {
      dispatch(setProposals(data.proposals));
      dispatch(setFetchStatus(FETCH_STATUSES.SUCCESS));
    }
  }, [loading, error, data]);

  return { loading, refetch };
};

export default useFetchProposals;

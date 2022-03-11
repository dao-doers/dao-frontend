import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';

import { gql } from 'apollo-boost';

import { setProposals, setFetchStatus } from 'redux/slices/proposals';
import { selectFetchStatus as fetchProposalsStatus } from 'redux/slices/proposals';

import FETCH_STATUSES from 'enums/fetchStatuses';

const useFetchProposals = () => {
  const dispatch = useDispatch();

  const proposalsStatus = useSelector(fetchProposalsStatus);

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

  if (proposalsStatus !== FETCH_STATUSES.SUCCESS) {
    const { loading, error, data, refetch } = useQuery(gql(expression.QUERY_PROPOSALS), {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      errorPolicy: 'ignore',
    });

    useEffect(() => {
      if (!loading && !error) {
        dispatch(setProposals(data.proposals));
        dispatch(setFetchStatus(FETCH_STATUSES.SUCCESS));
      }
    }, [loading, error, data]);

    return { data, loading, refetch };
  } else {
    return {
      data: {
        proposals: [
          {
            id: '0x0223f05c6c27f60e8c7606db3e173a535e9728b2-proposal-0',
            createdAt: '1646998809',
            proposalIndex: '0',
            proposalId: '0',
            moloch: { id: '0x0223f05c6c27f60e8c7606db3e173a535e9728b2', __typename: 'Moloch' },
            molochAddress: '0x0223f05c6c27f60e8c7606db3e173a535e9728b2',
            memberAddress: '0x0000000000000000000000000000000000000000',
            delegateKey: '0xf6b6aef440c6e77df49ab556bc8e5bd24ab9d761',
            applicant: '0xf6b6aef440c6e77df49ab556bc8e5bd24ab9d761',
            proposer: '0xf6b6aef440c6e77df49ab556bc8e5bd24ab9d761',
            sponsor: '0x8016dcd1af7c8cceda53e4d2d2cd4e2924e245b6',
            sharesRequested: '12',
            lootRequested: '0',
            tributeOffered: '1200000000',
            tributeToken: '0xc03da4356b4030f0ec2494c18dcfa426574e10d5',
            tributeTokenSymbol: 'dCKB',
            tributeTokenDecimals: '8',
            paymentRequested: '0',
            paymentToken: '0xc03da4356b4030f0ec2494c18dcfa426574e10d5',
            paymentTokenSymbol: null,
            paymentTokenDecimals: null,
            startingPeriod: '2005',
            yesVotes: '0',
            noVotes: '0',
            sponsored: true,
            sponsoredAt: '1646998996',
            processed: false,
            didPass: false,
            cancelled: false,
            aborted: null,
            whitelist: false,
            guildkick: false,
            newMember: true,
            trade: false,
            details:
              '{"title": "Member 1", "description": "0xa633a65FB6690B415E4990060C554f2A6DB793CF", "link": "dz.lpl"}',
            maxTotalSharesAndLootAtYesVote: '0',
            votes: [],
            yesShares: '0',
            noShares: '0',
            votingPeriodStarts: '1646999010',
            votingPeriodEnds: '1647000060',
            gracePeriodEnds: '1647001110',
            molochVersion: '2',
            __typename: 'Proposal',
          },
        ],
      },
      loading: false,
    };
  }
};

export default useFetchProposals;

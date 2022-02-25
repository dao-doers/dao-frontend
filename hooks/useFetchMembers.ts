import { useQuery } from '@apollo/react-hooks';

import { gql } from 'apollo-boost';

const useFetchMembers = () => {
  const PROPOSAL_DATA = `
  id                          
  createdAt                   
  moloch                      
  molochAddress              
  memberAddress              
  delegateKey                
  shares                      
  loot                        
  exists                      
  highestIndexYesVote          
  tokenTribute                 
  didRagequit                 
  votes                      
  submissions                
  tokenBalances               
  rageQuits                  
  proposedToKick              
  kicked                      
  jailed  
`;
  const PROPOSAL_ORDER = ' $orderBy: String, $orderDirection: String';
  const PROPOSAL_SORT = ' orderBy: $orderBy, orderDirection: $orderDirection';

  const expression = {
    QUERY_PROPOSALS: `
      query addressProposals(${PROPOSAL_ORDER}) {
        members(${PROPOSAL_SORT}) {
          ${PROPOSAL_DATA}
        }
      }
    `,
  };

  const orderBy = 'createdAt';
  const orderDirection = 'desc';

  const { loading, error, data, refetch } = useQuery(gql(expression.QUERY_PROPOSALS), {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
    variables: { orderBy, orderDirection },
  });

  return { data, loading, refetch };
};

export default useFetchMembers;

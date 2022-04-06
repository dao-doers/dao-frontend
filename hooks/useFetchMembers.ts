import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { selectUserAddress, selectIsLoggedIn, setUserShares } from 'redux/slices/user';

const useFetchMembers = () => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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

  useEffect(() => {
    if (!loading && data && isLoggedIn) {
      const user = data.members.filter((a: any) => {
        return a.memberAddress === userAddress;
      });
      if (user[0]) {
        dispatch(setUserShares(user[0].shares));
      }
    }
  }, [loading, data, isLoggedIn]);
};

export default useFetchMembers;

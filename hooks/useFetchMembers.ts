import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserAddress, selectIsLoggedIn, setUserShares } from 'redux/slices/user';

import { gql } from 'apollo-boost';

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
      // TODO: uncomment after new godwoken
      // const user = fetchMembers.data.members.filter((a: any) => {
      //   return a.memberAddress === userAddress;
      // });
      // if (user[0]) {
      //   dispatch(setUserShares(user[0].shares));
      // }
      // TODO: remove after new godwoken
      const address = '0xD173313A51f8fc37BcF67569b463abd89d81844f';
      if (userAddress === address.toLocaleLowerCase()) {
        const user = data.members.filter((a: any) => {
          return a.memberAddress === '0x8016dcd1af7c8cceda53e4d2d2cd4e2924e245b6';
        });
        if (user[0]) {
          dispatch(setUserShares(user[0].shares));
        }
      } else {
        dispatch(setUserShares(0));
      }
    }
  }, [loading, data, isLoggedIn]);
};

export default useFetchMembers;

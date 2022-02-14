import React, { Suspense, useEffect, useState } from 'react';
// import BigNumber from 'bignumber.js/bignumber';
import useCheckIndexerStatus from 'hooks/useCheckIndexerStatus';
import { useSelector } from 'react-redux';
import { selectUserAddress } from 'redux/slices/user';
import { ethers } from 'ethers';

// const BridgeComponent = React.lazy(() => import('nervos-bridge'));
// import { BridgeComponent } from 'nervos-bridge';
// import BridgeComponent from 'nervos-bridge';

/* 
#1 React.lazy
https://reactjs.org/docs/concurrent-mode-suspense.html
#2 self is not defined^^
https://stackoverflow.com/questions/66096260/why-am-i-getting-referenceerror-self-is-not-defined-when-i-import-a-client-side
*/

/* 1st example */
// const DAOBridgeComponent = async () => {
//   const accounts =  await window.ethereum.enable();
//   const provider = new ethers.providers.Web3Provider(window.ethereum);

//   const Bridge = new BridgeComponent();
//   const userAddress = useSelector(selectUserAddress);
//   console.log(userAddress);
//   // const { provider } = useCheckIndexerStatus();
//   console.log(provider);
//   return <Bridge provider={provider} userAddress="0xD173313A51f8fc37BcF67569b463abd89d81844f" assetsBlacklist={[]} />;
// };

/* 2nd example */
// const DAOBridgeComponent = async () => {
//   // if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
//   // Web3 browser user detected. You can now use the provider.
//   const accounts = await window.ethereum.enable();
//   // const curProvider = window['ethereum'] || window.web3.currentProvider
//   const provider = new ethers.providers.Web3Provider(window.ethereum);

//   console.log('accounts: ', accounts);
//   console.log('provider: ', provider);

//   const signer = provider.getSigner();
//   // }
//   // const userAddress = useSelector(selectUserAddress);
//   // console.log(userAddress);
//   // const { provider } = useCheckIndexerStatus();
//   return (
//     <Suspense fallback={<div>...Loading</div>}>
//       <BridgeComponent provider={provider} userAddress={accounts[0]} assetsBlacklist={[]} />
//     </Suspense>
//   );
// };

// const DAOBridgeComponent = () => {
//   const [state, setState] = useState<any>();
//   useEffect(() => {
//     const initDAOBridgeComponent = async () => {
//       const { BridgeComponent } = await import('nervos-bridge');
//       const accounts = await window.ethereum.enable();
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const Bridge = new BridgeComponent();
//       console.log(Bridge);
//     };
//     const Bridge2 = initDAOBridgeComponent().then(d => setState(d));
//   }, []);
//   console.log(state);
//   return state;
// };

// export default DAOBridgeComponent;

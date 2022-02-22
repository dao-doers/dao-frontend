import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useERC20Contract from 'hooks/useERC20Contract';
import { selectUserAddress, selectIsLoggedIn } from 'redux/slices/user';

import { AddressTranslator } from 'nervos-godwoken-integration';
// import useEthers from './useEthers';

const useCheckBalance = () => {
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log(isLoggedIn);

  const addressTranslator = new AddressTranslator();

  const [balance, setBalance] = useState(0);
  // const [ckbBalance, setCkbBalance] = useState<BigInt | null>(null);
  // const [depositAddress, setDepositAddress] = useState<string | null>(null);

  const [isChecked, setChecked] = useState(false);

  // TODO: solve problem with string | undefined
  // const SUDT_PROXY_CONTRACT_ADDRESS = process.env.SUDT_PROXY_CONTRACT_ADDRESS;
  const SUDT_PROXY_CONTRACT_ADDRESS = '0xc03da4356b4030f0ec2494c18dcfa426574e10d5';
  const erc20 = useERC20Contract(SUDT_PROXY_CONTRACT_ADDRESS);
  // const ethers = useEthers(userAddress);

  useEffect(() => {
    if (isLoggedIn) {
      const checkBalance = async () => {
        const polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress(userAddress);
        const tokenBalance = await erc20?.methods.balanceOf(polyjuiceAddress).call({ from: userAddress });
        setBalance(tokenBalance);
        setChecked(true);
      };
      checkBalance();
    }
  }, [erc20, userAddress, isLoggedIn]);

  // useEffect(() => {
  //   const fetchCkbBalance = async () => {
  //     if (isLoggedIn) {
  //       const CkbBalance = await ethers?.getBalance(userAddress);
  //       if (CkbBalance) {
  //         setCkbBalance(CkbBalance?.toBigInt());
  //       }
  //       await addressTranslator.init();
  //       const newDepositAddress = await addressTranslator.getLayer2DepositAddress(userAddress);
  //       setDepositAddress(newDepositAddress.toCKBAddress().toString());
  //     }
  //   };

  //   fetchCkbBalance();
  // }, [isLoggedIn, userAddress, ethers]);

  return { balance, isChecked };
};

export default useCheckBalance;

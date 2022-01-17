import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useERC20Contract from 'hooks/useERC20Contract';
import { selectUserAddress } from 'redux/slices/user';

import { AddressTranslator } from 'nervos-godwoken-integration';

const useCheckBalance = () => {
  const userAddress = useSelector(selectUserAddress);
  const addressTranslator = new AddressTranslator();

  const [balance, setBalance] = useState(0);
  const [isChecked, setChecked] = useState(false);

  // TODO: solve problem with string | undefined
  // const SUDT_PROXY_CONTRACT_ADDRESS = process.env.SUDT_PROXY_CONTRACT_ADDRESS;
  const SUDT_PROXY_CONTRACT_ADDRESS = '0xc03da4356b4030f0ec2494c18dcfa426574e10d5';
  const erc20 = useERC20Contract(SUDT_PROXY_CONTRACT_ADDRESS);

  useEffect(() => {
    const checkBalance = async () => {
      if (userAddress) {
        const polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress(userAddress);
        const tokenBalance = await erc20?.methods.balanceOf(polyjuiceAddress).call({ from: userAddress });
        setBalance(tokenBalance);
        setChecked(true);
      }
    };
    checkBalance();
  }, [erc20, userAddress]);

  return { balance, isChecked };
};

export default useCheckBalance;

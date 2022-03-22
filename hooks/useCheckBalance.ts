import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';

import { selectUserAddress, selectIsLoggedIn } from 'redux/slices/user';

// TODO: remove later
// import { AddressTranslator } from 'nervos-godwoken-integration';

const web3 = new Web3(process.env.PROVIDER_URL || '');

const useCheckBalance = () => {
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // TODO: remove later
  // const addressTranslator = new AddressTranslator();

  const [dckbBalance, setdCkbBalance] = useState(0);
  // TODO: remove later - start
  // const [depositAddress, setDepositAddress] = useState<string | null>(null);

  const [isChecked, setChecked] = useState(false);

  // TODO: remove later - start
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const checkBalance = async () => {
  //       const polyjuiceAddress = addressTranslator.ethAddressToGodwokenShortAddress(userAddress);
  //       console.log(polyjuiceAddress);
  //     };
  //     checkBalance();
  //   }
  // }, [erc20, userAddress, isLoggedIn]);
  // TODO: remove later - end

  useEffect(() => {
    const fetchCkbBalance = async () => {
      if (isLoggedIn) {
        const balance = Number(BigInt(await web3.eth.getBalance(userAddress)));
        if (balance) {
          setdCkbBalance(balance);
        }
        setChecked(true);
        // await addressTranslator.init();
        // const newDepositAddress = await addressTranslator.getLayer2DepositAddress(userAddress);
        // setDepositAddress(newDepositAddress.toCKBAddress().toString());
      }
    };

    fetchCkbBalance();
  }, [isLoggedIn, userAddress]);

  return { dckbBalance, isChecked };
};

export default useCheckBalance;

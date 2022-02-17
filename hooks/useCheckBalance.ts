import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useERC20Contract from 'hooks/useERC20Contract';
import { selectUserAddress } from 'redux/slices/user';

import { AddressTranslator } from 'nervos-godwoken-integration';
import useEthers from './useEthers';

const useCheckBalance = () => {
  const userAddress = useSelector(selectUserAddress);
  const addressTranslator = new AddressTranslator();

  const [balance, setBalance] = useState(0);
  const [ckbBalance, setCkbBalance] = useState<BigInt | null>(null);
  const [depositAddress, setDepositAddress] = useState<string | null>(null)
  console.log('depositAddress', depositAddress);
  console.log('fetchCkbBalance', ckbBalance);

  const [isChecked, setChecked] = useState(false);

  // TODO: solve problem with string | undefined
  // const SUDT_PROXY_CONTRACT_ADDRESS = process.env.SUDT_PROXY_CONTRACT_ADDRESS;
  const SUDT_PROXY_CONTRACT_ADDRESS = '0xc03da4356b4030f0ec2494c18dcfa426574e10d5';
  const erc20 = useERC20Contract(SUDT_PROXY_CONTRACT_ADDRESS);
  const ethers = useEthers(userAddress);

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

  useEffect(() => {
    const fetchCkbBalance = async () => {
      if (userAddress) {
        const CkbBalance = await ethers?.getBalance(userAddress);
        setCkbBalance(CkbBalance?.toBigInt());
        await addressTranslator.init();
        const newDepositAddress = await addressTranslator.getLayer2DepositAddress(userAddress);
        setDepositAddress(newDepositAddress.toCKBAddress().toString());
      }
    }

    fetchCkbBalance();
  }, [userAddress, ethers]);

  return { balance, isChecked };
};

export default useCheckBalance;

/* eslint-disable @typescript-eslint/no-shadow */
import ERC20_JSON from 'abi/ERC20.json';

import { useEffect, useState } from 'react';

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import PolyjuiceHttpProvider from '@polyjuice-provider/web3';

const providerConfig = {
  web3Url: 'https://godwoken-testnet-web3-rpc.ckbapp.dev',
};

const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);
const web3 = new Web3(provider);

const useERC20Contract = (erc20Address: string) => {
  const [erc20, setERC20] = useState<Contract | null>();

  useEffect(() => {
    if (web3) {
      /* 
      TODO
      maybe we can use abiLibrary.eth
      */
      const erc20 = new web3.eth.Contract(ERC20_JSON.abi as AbiItem[], erc20Address);

      setERC20(erc20);

      console.log('erc20 connected', erc20);
    }
  }, [erc20Address, web3]);

  return erc20;
};

export default useERC20Contract;

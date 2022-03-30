/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { convertToCogs } from 'utils/bignumber';
import Web3 from 'web3';
import ERC20_JSON from 'abi/ERC20.json';

const { AddressTranslator } = require('nervos-godwoken-integration');

export const useDCKBTokenHook = () => {
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const [txnInfo, setTxnInfo] = useState({ txnLink: null, txnAmount: 0, tokenName: '', tokenSymbol: '' });

  let web3: Web3 | null = null;
  let provider = null;
  provider = window.ethereum;
  web3 = new Web3(provider);
  const tokenContractAddress = '0x884541623C1B26A926a5320615F117113765fF81';

  const resetTxnInfo = () => {
    setTxnInfo({ ...txnInfo, txnLink: null });
  };

  const mintDCKTokens = async (tokenId, amount, toAddress) => {
    try {
      const addressTranslator = new AddressTranslator();
      await addressTranslator.init('testnet');
      // const contractAddress = web3?.utils.toChecksumAddress(tokenContractAddress);
      // const contract = new web3?.eth.Contract(ERC20_JSON, contractAddress);
      // const decimals = await contract.methods.decimals().call();
      // const amountInCogs = convertToCogs(amount, decimals);
      const dckbIssuerHash = '0xc43009f083e70ae3fee342d59b8df9eec24d669c1c3a3151706d305f5362c37e';
      const balance = await addressTranslator.getSUDTBalance(dckbIssuerHash);

      console.log({
        balance,
      });

      const tx = await addressTranslator.sendSUDT(amount, toAddress, dckbIssuerHash);

      console.log({
        tx,
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };
  return {
    mintDCKTokens,
    loader,
    txnInfo,
    resetTxnInfo,
  };
};

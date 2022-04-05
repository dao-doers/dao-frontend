/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { convertToCogs } from 'utils/bignumber';
import Web3 from 'web3';
import ERC20_JSON from 'abi/ERC20.json';
import { AddressTranslator, WalletAssetsSender } from 'nervos-godwoken-integration';

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
  const ETHEREUM_PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';
  const dckbIssuerHash = '0xc43009f083e70ae3fee342d59b8df9eec24d669c1c3a3151706d305f5362c37e';
  const addressTranslator = new AddressTranslator();

  const mintDCKTokens = async (tokenId: any, amount: string, toAddress: string) => {
    try {
      await addressTranslator.init('testnet');
      const assetSender = new WalletAssetsSender('https://testnet.ckb.dev/rpc', 'https://testnet.ckb.dev/indexer');
      await assetSender.init('testnet');
      await assetSender.connectWallet(ETHEREUM_PRIVATE_KEY); // you can also pass private key
      // const contractAddress = web3?.utils.toChecksumAddress(tokenContractAddress);
      // const contract = new web3?.eth.Contract(ERC20_JSON, contractAddress);
      // const decimals = await contract.methods.decimals().call();
      // const amountInCogs = convertToCogs(amount, decimals);
      // const txnHash = await assetSender.mint(contractAddress, amountInCogs, toAddress);
      const txHash = await addressTranslator.sendSUDT(amount, toAddress, dckbIssuerHash);

      console.log({
        txHash,
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };

  const balanceFromWallet = async () => {
    try {
      await addressTranslator.init('testnet');
      const ckbBalance = await addressTranslator.getConnectedWalletCKBBalance();
      const dckbBalance = await addressTranslator.getConnectedWalletSUDTBalance(dckbIssuerHash);

      return { ckbBalance, dckbBalance };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };

  /*
Deposit to Layer 2 address on Layer 1
https://www.npmjs.com/package/nervos-godwoken-integration
*/
  const createLayer2Address = async () => {
    try {
      let layer1TxHash;
      await addressTranslator.init('testnet');

      await addressTranslator.connectWallet(ETHEREUM_PRIVATE_KEY);

      const ethereumAddress = addressTranslator.getConnectedWalletAddress();
      if (ethereumAddress) {
        layer1TxHash = await addressTranslator.createLayer2Address(ethereumAddress);
        console.log(`Deposit to Layer 2 address on Layer 1: \n${layer1TxHash}`);
      }
      return layer1TxHash;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return {
    mintDCKTokens,
    createLayer2Address,
    balanceFromWallet,
    loader,
    txnInfo,
    resetTxnInfo,
  };
};

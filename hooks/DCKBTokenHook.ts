/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddressTranslator, WalletAssetsSender } from 'nervos-godwoken-integration';
import { BigNumber } from 'ethers';

import PROCESSING_STATUSES from 'enums/processingStatuses';
import { setOpen, setMessage, setStatus } from 'redux/slices/modalTransaction';

export const useDCKBTokenHook = () => {
  const [loader, setLoader] = useState(false);
  const [loaderLayer2Address, setLoaderLayer2Address] = useState(false);
  const [loaderBalance, setLoaderBalance] = useState(false);

  const pckbIssuerHash = '0xc43009f083e70ae3fee342d59b8df9eec24d669c1c3a3151706d305f5362c37e';
  const additionalCKB = (85 * 10 ** 8).toString(); // additional CKB capacity is required so resulting transaction output contains at least 400 CKB

  const dispatch = useDispatch();

  const addressTranslator = new AddressTranslator();
  const assetSender = new WalletAssetsSender('https://testnet.ckb.dev/rpc', 'https://testnet.ckb.dev/indexer');

  const mintDCKBTokens = async (amount: string, toAddress: string) => {
    console.log({
      amount,
      destinationAddress: toAddress,
    });
    try {
      setLoader(true);
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));
      dispatch(setMessage('Please confirm transaction from your wallet...'));

      await assetSender.init('testnet');
      await assetSender.connectWallet(); // you can also pass private key
      await assetSender.sendSUDT(amount, toAddress, pckbIssuerHash, additionalCKB);
    } catch (error: any) {
      setLoader(false);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const balanceFromWallet = async () => {
    try {
      setLoaderBalance(true);
      await assetSender.init('testnet');
      await assetSender.connectWallet();
      const ckbBalance = BigNumber.from(await assetSender.getConnectedWalletCKBBalance());
      const pckbBalance = BigNumber.from(await assetSender.getConnectedWalletSUDTBalance(pckbIssuerHash));

      return { ckbBalance, pckbBalance };
    } catch (error) {
      setLoaderBalance(false);
      throw error;
    } finally {
      setLoaderBalance(false);
    }
  };

  const connectedWalletAddress = async () => {
    try {
      await assetSender.init('testnet');
      await assetSender.connectWallet();
      const walletCKBAddress = await assetSender.getConnectedWalletCKBAddress();

      return walletCKBAddress;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getLayer2Address = async (ethAddress: string) => {
    try {
      setLoaderLayer2Address(true);
      await addressTranslator.init('testnet');

      const accountLayer2Address = await addressTranslator.getLayer2DepositAddress(ethAddress);
      return accountLayer2Address;
    } catch (error: any) {
      setLoaderLayer2Address(false);
      throw error;
    } finally {
      setLoaderLayer2Address(false);
    }
  };

  /*
Deposit to Layer 2 address on Layer 1
https://www.npmjs.com/package/nervos-godwoken-integration
*/
  const createLayer2Account = async (ethAddress: string) => {
    let layer1TxHash;
    try {
      setLoaderLayer2Address(true);
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));
      dispatch(setMessage('Please confirm transaction from your wallet...'));

      await addressTranslator.init('testnet');

      await addressTranslator.connectWallet();

      layer1TxHash = await addressTranslator.createLayer2Address(ethAddress);
      console.log(`Deposit to Layer 2 address on Layer 1: \n${layer1TxHash}`);
      return layer1TxHash;
    } catch (error: any) {
      setLoaderLayer2Address(false);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage('Address not created, please try again!' || error.message || error.toString()));
      throw error;
    } finally {
      setLoaderLayer2Address(false);
    }
  };

  return {
    mintDCKBTokens,
    createLayer2Account,
    balanceFromWallet,
    getLayer2Address,
    connectedWalletAddress,
    loader,
    loaderLayer2Address,
    loaderBalance,
  };
};

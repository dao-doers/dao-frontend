/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AddressTranslator, IAddressTranslatorConfig, WalletAssetsSender } from 'nervos-godwoken-integration';
import PROCESSING_STATUSES from 'enums/processingStatuses';
import { setOpen, setMessage, setStatus } from 'redux/slices/modalTransaction';

export const useDCKBTokenHook = () => {
  const [loader, setLoader] = useState(false);
  const [loaderLayer2Address, setLoaderLayer2Address] = useState(false);
  const [loaderBalance, setLoaderBalance] = useState(false);

  const tokenContractAddress = '0x884541623C1B26A926a5320615F117113765fF81';

  const dckbIssuerHash = '0xc43009f083e70ae3fee342d59b8df9eec24d669c1c3a3151706d305f5362c37e';

  const TESTNET_CONFIG: IAddressTranslatorConfig = {
    CKB_URL: 'https://testnet.ckb.dev',
    RPC_URL: 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev',
    INDEXER_URL: 'https://testnet.ckb.dev/indexer',
    deposit_lock_script_type_hash: '0xcc2b4e14d7dfeb1e72f7708ac2d7f636ae222b003bac6bccfcf8f4dfebd9c714',
    eth_account_lock_script_type_hash: '0x10571f91073fdc3cdef4ddad96b4204dd30d6355f3dda9a6d7fc0fa0326408da',
    rollup_type_script: {
      code_hash: '0x0d3bfeaa292a59fcb58ed026e8f14e2167bd27f1765aa4b2af7d842b6123c6a9',
      hash_type: 'type',
      args: '0x8137c84a9089f92fee684ac840532ee1133b012a9d42b6b76b74fbdde6999230',
    },
    rollup_type_hash: '0x4940246f168f4106429dc641add3381a44b5eef61e7754142f594e986671a575',
    rc_lock_script_type_hash: '0x79f90bb5e892d80dd213439eeab551120eb417678824f282b4ffb5f21bad2e1e',
  };
  const dispatch = useDispatch();

  // const addressTranslator = new AddressTranslator();
  const addressTranslator = new AddressTranslator(TESTNET_CONFIG);

  const assetSender = new WalletAssetsSender('https://testnet.ckb.dev/rpc', 'https://testnet.ckb.dev/indexer');

  const mintDCKTokens = async (tokenId: any, amount: string, toAddress: string) => {
    const successMessage = `Transfer successfully minted ${amount} ${tokenId} to ${toAddress}`;
    try {
      setLoader(true);
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));
      dispatch(setMessage('Please confirm transaction from your wallet...'));

      await assetSender.init('testnet');
      await assetSender.connectWallet(); // you can also pass private key
      // const contractAddress = web3?.utils.toChecksumAddress(tokenContractAddress);
      // const contract = new web3?.eth.Contract(ERC20_JSON, contractAddress);
      // const decimals = await contract.methods.decimals().call();
      // const amountInCogs = convertToCogs(amount, decimals);
      await assetSender.sendSUDT(amount, toAddress, dckbIssuerHash);

    } catch (error: any) {
      setLoader(false);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage('Transfer not sent, please try again!' || error.message || error.toString()));
      throw error;
    } finally {
      setLoader(false);
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setMessage(`${successMessage}`));
    }
  };

  const balanceFromWallet = async () => {
    try {
      setLoaderBalance(true);
      await assetSender.init('testnet');
      await assetSender.connectWallet();
      const ckbBalance = await assetSender.getConnectedWalletCKBBalance();
      const dckbBalance = await assetSender.getConnectedWalletSUDTBalance(dckbIssuerHash);

      return { ckbBalance, dckbBalance };
    } catch (error) {
      setLoaderBalance(false);
      console.log(error);
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

  const fetchConnectedAccountBalance = async (address: any) => {
    const response = await fetch(TESTNET_CONFIG.RPC_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [address, 'latest'],
      }),
      mode: 'cors',
    });

    const json = await response.json();

    return parseInt(json.result);
  };

  /*
Deposit to Layer 2 address on Layer 1
https://www.npmjs.com/package/nervos-godwoken-integration
*/
  const createLayer2Address = async () => {
    let layer1TxHash;
    const successMessage = `Address successfully created! https://explorer.nervos.org/aggron/${layer1TxHash}`;
    try {
      setLoaderLayer2Address(true);
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));
      dispatch(setMessage('Please confirm transaction from your wallet...'));

      await addressTranslator.init('testnet');

      await addressTranslator.connectWallet();

      const ethereumAddress = addressTranslator.getConnectedWalletAddress();
      if (ethereumAddress) {
        layer1TxHash = await addressTranslator.createLayer2Address(ethereumAddress);
        console.log(`Deposit to Layer 2 address on Layer 1: \n${layer1TxHash}`);
      }
      return layer1TxHash;
    } catch (error: any) {
      setLoaderLayer2Address(false);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage('Address not created, please try again!' || error.message || error.toString()));
      throw error;
    } finally {
      setLoaderLayer2Address(false);
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setMessage(`${successMessage}`));
    }
  };
  return {
    mintDCKTokens,
    createLayer2Address,
    balanceFromWallet,
    fetchConnectedAccountBalance,
    connectedWalletAddress,
    loader,
    loaderLayer2Address,
    loaderBalance,
  };
};

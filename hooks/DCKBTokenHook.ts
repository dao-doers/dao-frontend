/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { convertToCogs } from 'utils/bignumber';
import Web3 from 'web3';
import ERC20_JSON from 'abi/ERC20.json';
import { AddressTranslator, WalletAssetsSender } from 'nervos-godwoken-integration';

export const useDCKBTokenHook = () => {
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const [txnInfo, setTxnInfo] = useState({ txnLink: '', txnAmount: '', tokenName: '', tokenSymbol: '' });

  let web3: Web3 | null = null;
  let provider = null;
  provider = window.ethereum;
  web3 = new Web3(provider);
  const tokenContractAddress = '0x884541623C1B26A926a5320615F117113765fF81';

  const resetTxnInfo = () => {
    setTxnInfo({ ...txnInfo, txnLink: '' });
  };
  const ETHEREUM_PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';
  const dckbIssuerHash = '0xc43009f083e70ae3fee342d59b8df9eec24d669c1c3a3151706d305f5362c37e';
  // const addressTranslator = new AddressTranslator();
  const addressTranslator = new AddressTranslator({
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
  });
  const assetSender = new WalletAssetsSender('https://testnet.ckb.dev/rpc', 'https://testnet.ckb.dev/indexer');

  const mintDCKTokens = async (tokenId: any, amount: string, toAddress: string) => {
    try {
      setLoader({
        isLoading: true,
        message: 'Please confirm transaction from your wallet...',
        title: 'Wallet Interaction',
      });
      await assetSender.init('testnet');
      await assetSender.connectWallet(ETHEREUM_PRIVATE_KEY); // you can also pass private key
      // const contractAddress = web3?.utils.toChecksumAddress(tokenContractAddress);
      // const contract = new web3?.eth.Contract(ERC20_JSON, contractAddress);
      // const decimals = await contract.methods.decimals().call();
      // const amountInCogs = convertToCogs(amount, decimals);
      // const txnHash = await assetSender.mint(contractAddress, amountInCogs, toAddress);
      const txHash = await assetSender.sendSUDT(amount, toAddress, dckbIssuerHash);
      setTxnInfo({
        txnLink: `https://explorer.nervos.org/aggron/${txHash}`,
        txnAmount: amount,
        tokenName: tokenId,
        tokenSymbol: tokenId,
      });
      console.log({
        txHash,
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader({
        isLoading: false,
        message: 'Transfer successfully sent, you are ready to use the application fully',
        title: 'Mint DCKB Tokens',
      });
    }
  };

  const balanceFromWallet = async () => {
    try {
      await assetSender.init('testnet');
      const ckbBalance = await assetSender.getConnectedWalletCKBBalance();
      const dckbBalance = await assetSender.getConnectedWalletSUDTBalance(dckbIssuerHash);

      return { ckbBalance, dckbBalance };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader({ isLoading: false, message: 'Balance successfully fetched', title: 'Balance' });
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
      setTxnInfo({
        txnLink: `https://explorer.nervos.org/aggron/${layer1TxHash}`,
        txnAmount: '',
        tokenName: 'layer1TxHash',
        tokenSymbol: '',
      });
      return layer1TxHash;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader({
        isLoading: false,
        message: 'Layer 2 address successfully created on Layer 1',
        title: 'Layer 2 address',
      });
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

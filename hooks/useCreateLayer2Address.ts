import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AddressTranslator } = require('nervos-godwoken-integration');

/*
Deposit to Layer 2 address on Layer 1
https://www.npmjs.com/package/nervos-godwoken-integration
*/
const useCreateLayer2Address = async () => {
  const ETHEREUM_PRIVATE_KEY = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';
  const addressTranslator = new AddressTranslator();
  await addressTranslator.init('testnet');

  console.log(`Using Ethereum address: ${ETHEREUM_PRIVATE_KEY}`);
  await addressTranslator.connectWallet(ETHEREUM_PRIVATE_KEY);
  const ethereumAddress = addressTranslator.getConnectedWalletAddress();

  const layer2Address = await addressTranslator.createLayer2Address(ethereumAddress);
  console.log(`Deposit to Layer 2 address on Layer 1: \n${layer2Address}`);

  return layer2Address;
};

export default useCreateLayer2Address;
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUserAddress, selectIsLoggedIn } from 'redux/slices/user';
import { providers } from 'ethers';

import {
  CkitProvider,
  CreateRcUdtInfoCellBuilder,
  predefined,
  internal,
  RcSupplyLockHelper,
  MintRcUdtBuilder,
  helpers,
} from '@ckitjs/ckit';
import useEthers from './useEthers';

const { RcSecp256k1Signer: RcInternalSigner } = internal;
const privateKey = '0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5';

async function getContext() {
  const provider = new CkitProvider('https://testnet.ckb.dev/indexer', 'https://testnet.ckb.dev/rpc');
  await provider.init(predefined.Aggron);

  const signer = new RcInternalSigner(privateKey, provider);

  return { provider, signer };
}
const useQueryUdtBalance = async () => {
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { provider, signer } = await getContext();

  // const ethereum = window?.ethereum as providers.ExternalProvider;
  // const provider = new providers.Web3Provider(ethereum);

  // const mercury = new MercuryClient('https://testnet.ckb.dev/indexer');
  const { mercury } = provider;

  const helper = new RcSupplyLockHelper(mercury, {
    rcLock: provider.newScriptTemplate('RC_LOCK'),
    sudtType: provider.newScriptTemplate('SUDT'),
  });

  const sudtScript = helper.newSudtScript({
    rcIdentity: signer.getRcIdentity(),
    udtId: '0x126e754aaa32898714e0466d885f4bb5ffe1723e05acf944b06b2bc9ff3a3a0a',
  });

  const getUdtBalance = await provider.getUdtBalance(
    'ckt1q2rnvmpk0rc5ej7kv3ecdgvwqkhz0jte0r22d9f0kkpqe35cycur2myv07qpv9y9c0j2mnk6f3kyy4qszsq9g2qxr8j',
    sudtScript,
  );

  return getUdtBalance;
};

export default useQueryUdtBalance;

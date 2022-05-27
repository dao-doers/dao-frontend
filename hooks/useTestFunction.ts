import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

import { DCKBToken, MolochV2 } from 'utils/contracts';

import DCKBTokenJSON from 'lib/DCKBToken.json';
import MolochV2JSON from 'lib/MolochV2.json';

import { selectProvider, selectChainId } from 'redux/slices/main';

const useTestFunction = async () => {
  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);

  const tokenAddress = (DCKBTokenJSON.networks as any)[chainId].address;
  const molochAddress = (MolochV2JSON.networks as any)[chainId].address;

  const signer = provider.getSigner();
  const token = await DCKBToken(signer, chainId);
  const dao = await MolochV2(signer, chainId);

  const receipt = await (dao as ethers.Contract).getUserTokenBalance(
    '0x000000000000000000000000000000000000babe',
    '0x884541623C1B26A926a5320615F117113765fF81',
  );

  // const receipt = await tx.wait();
  console.log(receipt);

  return receipt;
};

export default useTestFunction;

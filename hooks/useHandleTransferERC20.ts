import abiLibrary from 'lib/abi';

import { ckbToShannons } from 'utils/formatShannons';

const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS;

const useHandleTransferERC20 = async (userAddress, receiverAddress, amount) => {
  const token = new web3.eth.Contract(abiLibrary.erc20, tributeToken);

  await token.methods
    .transfer(receiverAddress, ckbToShannons(amount))
    .send({
      from: userAddress,
      gas: 22000,
    })
    .on('receipt', () => {
      console.log('receipt');
    })
    .on('error', (error: any) => {
      console.log(error);
    });
};

export default useHandleTransferERC20;

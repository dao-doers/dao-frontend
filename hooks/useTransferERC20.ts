import abiLibrary from 'lib/abi';

const useTransferERC20 = async () => {
  const token = new web3.eth.Contract(abiLibrary.erc20, '0x884541623C1B26A926a5320615F117113765fF81');

  await token.methods
    .transfer('0x1AB74D40A7FCF1f43E5A3D3581881F060A08e139', 500000000)
    .send({
      from: '0x966B30e576A4d6731996748B48Dd67C94eF29067',
      gas: 22000,
    })
    .on('receipt', () => {
      console.log('receipt');
    })
    .on('error', (error: any) => {
      console.log(error);
    });
};

export default useTransferERC20;

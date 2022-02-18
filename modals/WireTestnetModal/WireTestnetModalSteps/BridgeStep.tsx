import { FC, useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { selectUserAddress } from 'redux/slices/user';
import { Formik, Form } from 'formik';

import styled from '@emotion/styled';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import DAOInput from 'components/DAOInput/DAOInput';
import DAOButton from 'components/DAOButton/DAOButton';

import useERC20Contract from 'hooks/useERC20Contract';

import config from 'config/config';

import { dCKBTransferSchema } from 'validators/minorValidators';

interface IBridge {
  handlePreviousStep: () => void;
}

const initialValues = {
  dCKBAmount: 0,
};

interface ValuesProps {
  dCKBAmount: number;
}

const NavButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BridgeStep: FC<IBridge> = ({ handlePreviousStep }) => {
  const userAddress = useSelector(selectUserAddress);

  const erc20 = useERC20Contract(config.nervos.SUDT_PROXY_CONTRACT_ADDRESS);

  // const sudtBalance = await collector.getSUDTBalance(sudt, ckbAddress);

  const [latestTransactionHash, setLatestTransactionHash] = useState<string | null>(null);

  const transferdCKB = async () => {};

  const onSubmit = async (values: ValuesProps) => {
    console.log('deposit');
    const decimals = await erc20?.methods.decimals().call();
    if (decimals) {
      const weiTransferValue = Web3.utils
        .toBN(values.dCKBAmount)
        .mul(Web3.utils.toBN(10).pow(Web3.utils.toBN(decimals)));
      console.log('deposit amount', weiTransferValue.toString());
      const transactionHash = await erc20?.methods.deposit().send({ from: userAddress, value: weiTransferValue });
      console.log('transaction hash', transactionHash);
      setLatestTransactionHash(transactionHash);

      const balance = await erc20?.methods.balanceOf(userAddress).call();
      console.log('balance', balance);
    }
  };

  return (
    <Formik validationSchema={dCKBTransferSchema} initialValues={initialValues} validateOnChange onSubmit={onSubmit}>
      {formik => (
        <Form>
          <Box mt={5} mb={4}>
            <Box>
              <Typography component="h6" variant="h6" paragraph>
                Transfer dCKB to Layer2
              </Typography>
              <Typography component="h6">
                Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum
                balance of 471 CKB needs to be maintained.
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <DAOInput
                label="Deposit to get"
                inputProps={{
                  id: 'dCKBAmount',
                  value: formik.values.dCKBAmount,
                  onChange: formik.handleChange,
                }}
                formControlProps={{
                  fullWidth: true,
                }}
                error={formik.errors.dCKBAmount}
              />
            </Box>

            <NavButtonsWrapper>
              <Box width="48%">
                <DAOButton onClick={handlePreviousStep}>Previous step</DAOButton>
              </Box>
              <Box width="48%">
                <DAOButton variant="gradientOutline" type="submit" disabled>
                  Transfer dCKB
                </DAOButton>
              </Box>
            </NavButtonsWrapper>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BridgeStep;

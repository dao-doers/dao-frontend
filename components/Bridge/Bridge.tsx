import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';

import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import useCheckProvider from 'hooks/useCheckProvider';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { ckbToShannons } from 'utils/formatShannons';
import formatAddress from 'utils/formatAddress';

import mintModalSchema from 'validators/mintModalSchema';

import { selectUserAddress, selectLayer1Balance, setLayer1Balance, selectCktLayer2Address } from 'redux/slices/user';
import { setMessage, setStatus } from 'redux/slices/modalTransaction';
import { tributeTokenToDisplayValue } from 'utils/units';

interface IBridgeComponent {
  onSubmitCompleteStep: (values: any) => void;
}
interface SwapFormValues {
  amount: number;
}

const BridgeComponent: FC<IBridgeComponent> = ({ onSubmitCompleteStep }) => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const balanceSUDT = useSelector(selectLayer1Balance);
  const cktLayer2Address = useSelector(selectCktLayer2Address);

  const hasProvider = useCheckProvider();
  const { loaderBalance, balanceFromWallet, mintDCKBTokens } = useDCKBTokenHook();

  // eslint-disable-next-line consistent-return
  const fetchWalletBalance = async () => {
    try {
      if (hasProvider && userAddress) {
        const balances = await balanceFromWallet();

        dispatch(setLayer1Balance(balances));
        return balances;
      }
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };

  useEffect((): void => {
    fetchWalletBalance();
  }, [hasProvider, userAddress]);

  const initialValues: SwapFormValues = {
    amount: 0,
  };

  const onSubmit = async (values: SwapFormValues) => {
    try {
      onSubmitCompleteStep(await mintDCKBTokens(ckbToShannons(values.amount), cktLayer2Address));

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(
        setMessage(`Transfered ${values.amount} pCKB to destination address ${formatAddress(cktLayer2Address)}`),
      );
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(error.message || error.toString()));
    }
  };

  return (
    <>
      <Typography component="h6" variant="h6">
        Bridge
      </Typography>
      <Typography mb={3}>Transfer pCKB from Layer 1 to Layer 2</Typography>

      <Formik validationSchema={mintModalSchema} initialValues={initialValues} validateOnChange onSubmit={onSubmit}>
        {formik => (
          <Form>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" mb={1}>
                Transfering from Layer 1 address
              </Typography>
              <Typography variant="body1-bold">{formatAddress(userAddress)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="body1" mb={2}>
                Current pCKB Layer 1 balance
              </Typography>

              {!loaderBalance ? (
                <Box display="flex" flexDirection="column" justifyContent="flex-end">
                  <Typography variant="body1-bold">
                    {balanceSUDT?.pckbBalance
                      ? `${tributeTokenToDisplayValue(balanceSUDT.pckbBalance)} pCKB`
                      : 'no balance'}
                  </Typography>
                </Box>
              ) : (
                <Box pl={1} display="flex" alignItems="center">
                  <DAOCircleLoader size={20} />
                </Box>
              )}
            </Box>

            <Box display="flex" mb={1}>
              <DAOInput
                label="Amount of pCKB to transfer"
                inputProps={{
                  id: 'amount',
                  value: formik.values.amount,
                  onChange: formik.handleChange,
                }}
                formControlProps={{
                  fullWidth: true,
                }}
                error={formik.errors.amount}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" mb={1}>
                Transfering to Layer 2 address
              </Typography>
              <Typography variant="body1-bold">{formatAddress(cktLayer2Address)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" mb={1}>
                {/* TODO: add mainnet fee */}
                Fee
              </Typography>
              <Typography variant="body1-bold">0</Typography>
            </Box>

            <Box mb={4}>
              <DAOButton variant="gradientOutline" type="submit">
                Swap
              </DAOButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BridgeComponent;

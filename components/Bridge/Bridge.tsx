import React, { useState, FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAddress,
  selectbalanceSUDT,
  selectIsLoggedIn,
  setbalanceSUDT,
  selectUserAddressLayer2,
} from 'redux/slices/user';
import PROCESSING_STATUSES from 'enums/processingStatuses';

import { Formik, Form, FormikErrors, Field } from 'formik';
import Image from 'next/image';
import styled from '@emotion/styled';
import Input from 'components/Input/Input';
import DAOButton from 'components/DAOButton/DAOButton';
import Box from '@mui/material/Box';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import { dCKBTransferSchema } from 'validators/minorValidators';
import formatAddress from 'utils/formatAddress';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import DAOTooltip from 'components/DAOTooltip/DAOTooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import useCheckProvider from 'hooks/useCheckProvider';
import { setMessage, setOpen, setStatus } from 'redux/slices/modalTransaction';


const Title = styled(Typography)`
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 0;
    text-align: center;
  }
`;

export const DownArrowBackground = styled.div`
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  margin: 3px auto;
  cursor: pointer;
`;

const AccordionWrapper = styled(Box)`
  justify-content: flex-end;
  width: 100%;
  padding-top: 60px;
  margin-bottom: 30px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const StyledAccordionB = styled(Accordion)`
  background-color: transparent;
  box-shadow: none;
  border-top: none;
  &:before {
    display: none;
  },
`;

const StyledAccordionSummaryB = styled(AccordionSummary)`
  padding: 0;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 8px 0px 16px 0px;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

interface IBridgeComponent {
  onSubmitCompleteStep: (values: any) => void;
}
interface SwapFormValues {
  amount: string;
  destinationAddress: string;
}

const BridgeComponent: FC<IBridgeComponent> = ({ onSubmitCompleteStep }) => {
  const dispatch = useDispatch();
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const balanceSUDT = useSelector(selectbalanceSUDT);
  const depositAddress = useSelector(selectUserAddressLayer2);

  const hasProvider = useCheckProvider();
  const { loader, loaderBalance, txnInfo, balanceFromWallet, mintDCKTokens } = useDCKBTokenHook();
  const [toast, setToast] = useState(null);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect((): void => {
    const fetchWalletBalance = async () => {
      try {
        if (hasProvider && userAddress) {
          const balances = await balanceFromWallet();

          dispatch(setbalanceSUDT(balances));
          return balances;
        }
      } catch (error: any) {
        setToast(error.message || error.toString());
        throw error;
      }
    };
    fetchWalletBalance();
    console.log('BALANCE', balanceSUDT);
  }, [hasProvider, userAddress]);

  const initialAddress = '';
  console.log(initialAddress);

  const initialValues: SwapFormValues = {
    amount: '',
    destinationAddress: initialAddress,
  };

  function displayErrorsOrSubmit(errors: FormikErrors<SwapFormValues>): string {
    if (errors.amount) {
      return errors.amount;
    }
    if (errors.destinationAddress) {
      return errors.destinationAddress;
    }
    return 'Swap now';
  }

  const resetToast = () => {
    setToast(null);
  };

  return (
    <>
      <Snackbar
        open
        message={toast}
        onClose={resetToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {toast}
        </Alert>
      </Snackbar>
      <Title variant="h2" mb={2}>
        Bridge
      </Title>
      <Formik
        validationSchema={dCKBTransferSchema}
        initialValues={initialValues}
        validateOnChange
        onSubmit={async (values, actions) => {
          try {
            dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
            dispatch(setOpen(true));
            dispatch(setMessage(`${loader.message}\n${loader.title}`));

            onSubmitCompleteStep(await mintDCKTokens('dCKB', values.amount, values.destinationAddress));
            actions.setSubmitting(false);

            dispatch(setMessage(`${loader.message}\n${txnInfo.txnLink}\n${txnInfo.txnAmount}${txnInfo.tokenSymbol}`));
            dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
          } catch (error: any) {
            setToast(error.message || error.toString());
            actions.setSubmitting(false);

            dispatch(setStatus(PROCESSING_STATUSES.ERROR));
            dispatch(setMessage(loader.message || error.message || error.toString()));
          }
          console.log({
            amount: values.amount,
            destinationAddress: values.destinationAddress,
          });
          console.log(txnInfo);
        }}
        validate={values => {
          console.log(values);
          const errors: FormikErrors<SwapFormValues> = {};
          console.log('errors', errors);
          // else if (!isValidAddress(values.destinationAddress, values.network.baseObject)) {
          //   errors.destinationAddress = 'Enter a valid destination address';
          // }
          return errors;
        }}
      >
        {formik => (
          <Form>
            <Box display="flex" height="32px" justifyContent="space-between" alignItems="center">
              FROM:{' '}
              <Box display="flex" justifyContent="space-between" alignItems="center" minWidth="100px" maxWidth="300px">
                <Image src="/logos/wallet.png" alt="address:" height="15" width="15" />
                <Typography variant="body2">{formatAddress(userAddress) || 'Connect to metamask'}</Typography>
              </Box>
            </Box>
            <Box display="flex" height="32px">
              <Field name="amount">
                {({ field }: any) => (
                  <Input
                    {...field}
                    icon={{ src: '/logos/nervos.svg' }}
                    header="Amount"
                    placeholder="Enter amount..."
                    name="amount"
                    id="amount"
                    type="string"
                    autoComplete="off"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    customStyles={{
                      inputColor: '#00cc9b',
                      headerStyles: { color: '#00cc9b' },
                      borderOnFocus: '1px solid #00cc9b',
                    }}
                    tooltipMessage="Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum balance of 471 CKB needs to be maintained after transaction."
                    error={formik.errors.amount && true}
                    errorMessage={formik.errors.amount}
                    required
                  />
                )}
              </Field>
            </Box>
            <Box display="flex" height="32px" alignItems="center" pt={8}>
              BALANCE:{' '}
              {!loaderBalance.isLoading ? (
                <Typography variant="body1-bold">
                  {balanceSUDT?.dckbBalance ? (
                    <Box display="flex" alignItems="center" pl={1}>
                      {`${balanceSUDT?.dckbBalance} ${txnInfo.tokenSymbol}`}
                      <Box pl={5}>
                        <DAOPlainButton
                          onClick={() => {
                            formik.setFieldValue('amount', balanceSUDT?.dckbBalance);
                          }}
                        >
                          <DAOTooltip
                            tooltipStyles={{ borderRadius: '10px' }}
                            backgroundColor="#333"
                            message="use full balance"
                            textColor="#eee"
                          >
                            USE FULL AMOUNT
                          </DAOTooltip>
                        </DAOPlainButton>
                      </Box>
                    </Box>
                  ) : (
                    <Box pl={1} style={{ color: '#eb0000' }}>
                      {loaderBalance.message}
                    </Box>
                  )}
                </Typography>
              ) : (
                <Box pl={1}>{loaderBalance.message}</Box>
              )}
            </Box>
            <Box display="flex" height="32px" justifyContent="space-between" alignItems="center" pt={8} pb={2}>
              TO:{' '}
              <Typography variant="body2">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  minWidth="100px"
                  maxWidth="300px"
                >
                  <Image src="/logos/wallet.png" alt="address:" height="15" width="15" />
                  {depositAddress
                    ? formatAddress(depositAddress)
                    : formatAddress(formik.values.destinationAddress) || 'Enter a destination address from nexisdao'}
                </Box>
              </Typography>
            </Box>
            <Box display="flex" height="32px">
              <Field name="destinationAddress">
                {({ field }: any) => (
                  <Input
                    {...field}
                    icon={{ src: '/logos/wallet.png' }}
                    id="destinationAddress"
                    name="destinationAddress"
                    type="text"
                    autoComplete="off"
                    header="Destination address"
                    placeholder="e.g ckt1...jmyvr0v"
                    value={formik.values.destinationAddress}
                    onChange={formik.handleChange}
                    customStyles={{
                      inputColor: '#00D395',
                      headerStyles: { color: '#00D395' },
                      borderOnFocus: '1px solid #00D395',
                    }}
                    disabled={userAddress === '' && initialAddress !== ''}
                    tooltipMessage="enter the wallet address you want to send funds, it begins with ckt1..."
                    rightIcon={
                      formik.values.destinationAddress
                        ? { src: '/logos/x.svg', tooltipMessage: 'Clear address' }
                        : undefined
                    }
                    rightIconOnClick={() => {
                      formik.setFieldValue('destinationAddress', '');
                    }}
                    error={formik.errors.destinationAddress && true}
                    errorMessage={formik.errors.destinationAddress}
                    required
                  />
                )}
              </Field>
            </Box>

            <AccordionWrapper>
              <StyledAccordionB>
                <StyledAccordionSummaryB
                  expandIcon={<StyledExpandMoreIcon />}
                  aria-controls="blockchain-status-accordion"
                  id="panel1a-header"
                >
                  <Typography variant="body1-bold">Advanced</Typography>
                </StyledAccordionSummaryB>
                <StyledAccordionDetails>
                  <Field name="editDestinationAddress">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        icon={{ src: '/logos/wallet.png' }}
                        id="editDestinationAddress"
                        name="editDestinationAddress"
                        type="text"
                        autoComplete="off"
                        header="Edit destination address (optional)"
                        placeholder="Nervos layer 2 adress: e.g 0x123...ab56c"
                        value={formik.values.destinationAddress}
                        onChange={formik.handleChange}
                        customStyles={{
                          inputColor: '#00D395',
                          headerStyles: { color: '#00D395' },
                          borderOnFocus: '1px solid #00D395',
                        }}
                        disabled={userAddress === ''}
                        tooltipMessage="enter the wallet address you want to send funds, it begins with ckt1..."
                        rightIcon={
                          formik.values.destinationAddress
                            ? { src: '/logos/x.svg', tooltipMessage: 'Clear address' }
                            : undefined
                        }
                        rightIconOnClick={() => {
                          formik.setFieldValue('destinationAddress', '');
                        }}
                        error={formik.errors.destinationAddress && true}
                        errorMessage={formik.errors.destinationAddress}
                      />
                    )}
                  </Field>
                </StyledAccordionDetails>
                <Box>
                  <Typography variant="body1-bold">Full address:</Typography>
                  <Typography>{formik.values.destinationAddress || 'no address'}</Typography>
                </Box>
                <Box pt={2}>
                  <Typography variant="body1-bold">Fee: 10000 shanon</Typography>
                </Box>
              </StyledAccordionB>
            </AccordionWrapper>
            {isLoggedIn ? (
              <Box pt={5}>
                <DAOButton
                  variant="gradientOutline"
                  type="submit"
                  isLoading={formik.isSubmitting}
                  disabled={
                    formik.errors.amount != null || formik.errors.destinationAddress != null || formik.isSubmitting
                  }
                >
                  {displayErrorsOrSubmit(formik.errors)}
                </DAOButton>
              </Box>
            ) : (
              <ConnectWalletButton />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BridgeComponent;

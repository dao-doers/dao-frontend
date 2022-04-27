import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAddress,
  selectbalanceSUDT,
  selectIsLoggedIn,
  setbalanceSUDT,
  selectUserLayer2Address,
  setUserLayer2Address,
} from 'redux/slices/user';
import PROCESSING_STATUSES from 'enums/processingStatuses';
import { setMessage, setStatus } from 'redux/slices/modalTransaction';

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

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import useCheckProvider from 'hooks/useCheckProvider';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import { isValueGreaterThanProvided } from 'utils/bignumber';

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
  const depositAddress = useSelector(selectUserLayer2Address);

  const hasProvider = useCheckProvider();
  const { loaderBalance, balanceFromWallet, mintDCKTokens, fetchConnectedAccountLayer2Address } = useDCKBTokenHook();

  // eslint-disable-next-line consistent-return
  const fetchWalletBalance = async () => {
    try {
      if (hasProvider && userAddress) {
        const balances = await balanceFromWallet();

        dispatch(setbalanceSUDT(balances));
        return balances;
      }
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };

  const getLayer2Address = async () => {
    try {
      const layer2Address = await fetchConnectedAccountLayer2Address(userAddress);
      dispatch(setUserLayer2Address(layer2Address));

      console.log('LAYER2 ADDRESS', layer2Address);
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };

  useEffect((): void => {
    fetchWalletBalance();
  }, [hasProvider, userAddress]);

  useEffect((): void => {
    getLayer2Address();
  }, [hasProvider, userAddress]);

  const initialAddress = depositAddress;
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

  return (
    <>
      <Title variant="h2" mb={2}>
        Bridge
      </Title>
      <Formik
        validationSchema={dCKBTransferSchema}
        initialValues={initialValues}
        validateOnChange
        onSubmit={async (values, actions) => {
          const unmaskAmount = values.amount.replace(/[^\d]/g, '');
          try {
            onSubmitCompleteStep(await mintDCKTokens(unmaskAmount, values.destinationAddress));
            actions.setSubmitting(false);

            dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
            dispatch(
              setMessage(
                `Transfer successfully minted!\n${values.amount} dCKB to destination address \n${values.destinationAddress}\n`,
              ),
            );

            actions.resetForm();
          } catch (error: any) {
            actions.setSubmitting(false);

            dispatch(setStatus(PROCESSING_STATUSES.ERROR));
            dispatch(setMessage(error.message || error.toString()));
          }
        }}
        validate={values => {
          const errors: FormikErrors<SwapFormValues> = {};
          const amount = Number(values.amount?.toString()?.replace(',', '.'));
          if (isValueGreaterThanProvided(amount, Number(balanceSUDT?.dckbBalance))) {
            errors.amount = 'insufficient balance';
          }
          return errors;
        }}
      >
        {formik => (
          <Form>
            <Box display="flex" height="32px" justifyContent="space-between" alignItems="center">
              FROM:{' '}
              <Box display="flex" justifyContent="space-between" alignItems="center" minWidth="100px" maxWidth="300px">
                <Image src="/logos/wallet.png" alt="address:" height="15" width="15" />
                <Typography variant="body2" paddingLeft={0.5}>
                  {formatAddress(userAddress) || 'Connect to metamask'}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" height="32px">
              <Field name="amount">
                {({ field }: any) => (
                  <Input
                    {...field}
                    icon={{ src: '/logos/nervos.svg' }}
                    rightIcon={
                      !formik.errors.amount
                        ? {
                            customIcon: <DAOPlainButton style={{ color: '#00D395' }}>dCKB</DAOPlainButton>,
                            tooltipMessage:
                              'It is minted on the Nexis DAO, Since dCKB is minted on L1 it needs a way of being swapped onto L2',
                          }
                        : null
                    }
                    inputMask={{ mask: '999 999 999 999 999', maskChar: '' }}
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
                      borderOnFocus: '2px solid #00cc9b',
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
              {!loaderBalance ? (
                <Typography variant="body1-bold">
                  {balanceSUDT?.dckbBalance ? (
                    <Box display="flex" alignItems="center" pl={1}>
                      {`${balanceSUDT?.dckbBalance.replace(/\W/gi, '').replace(/(.{3})/g, '$1 ')} dCKB`}
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
                      no balance
                    </Box>
                  )}
                </Typography>
              ) : (
                <Box pl={1} display="flex" alignItems="center">
                  <DAOCircleLoader size={20} />
                </Box>
              )}
            </Box>
            <Box display="flex" height="32px" justifyContent="space-between" alignItems="center" pt={8} pb={2}>
              TO:{' '}
              <Box display="inherit">
                <Image src="/logos/wallet.png" alt="address:" height="15" width="15" />
                <Typography variant="body2" paddingLeft={0.5}>
                  {formatAddress(formik.values.destinationAddress) || 'Enter a destination address'}
                </Typography>
              </Box>
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
                    placeholder="e.g 0x123...ab56c"
                    value={formik.values.destinationAddress}
                    onChange={formik.handleChange}
                    customStyles={{
                      inputColor: '#00D395',
                      headerStyles: { color: '#00D395' },
                      borderOnFocus: '2px solid #00D395',
                    }}
                    disabled={userAddress === '' && initialAddress !== ''}
                    tooltipMessage="enter the wallet address you want to send funds, it must be layer 2 wallet address"
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
                  <Box pt={2}>
                    <Typography variant="body1-bold">Fee: 10000 shanon</Typography>
                  </Box>
                  <Box pt={2}>
                    <Typography variant="body1-bold">Video (walk through): comming soon</Typography>
                  </Box>
                </StyledAccordionDetails>
              </StyledAccordionB>
            </AccordionWrapper>
            {isLoggedIn ? (
              <Box pt={5}>
                <DAOButton
                  variant="gradientOutline"
                  type="submit"
                  isLoading={formik.isSubmitting}
                  disabled={
                    formik.errors.amount != null ||
                    formik.errors.destinationAddress != null ||
                    formik.isSubmitting ||
                    !isLoggedIn ||
                    balanceSUDT?.dckbBalance === 0
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

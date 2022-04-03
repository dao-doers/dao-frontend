import React, { useState, FC } from 'react';

import { useSelector } from 'react-redux';
import { selectUserAddress, selectIsLoggedIn } from 'redux/slices/user';

import { Formik, Form, FormikErrors } from 'formik';
import Image from 'next/image';
import styled from '@emotion/styled';
import Input from 'components/Input/Input';
import DAOButton from 'components/DAOButton/DAOButton';
import Box from '@mui/material/Box';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';

import useQueryUdtBalance from 'hooks/useQueryUdtBalance';
import useCreateLayer2Address from 'hooks/useCreateLayer2Address';
import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import { dCKBTransferSchema } from 'validators/minorValidators';
import formatAddress from 'utils/formatAddress';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import DAOTooltip from 'components/DAOTooltip/DAOTooltip';

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
  }
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
interface SwapFormValues {
  amount: string;
  destination_address?: string;
}

const SUDT_SYMBOL = 'dCKB';

const BridgeComponent: FC<SwapFormValues> = () => {
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [depositAddress, setDepositAddress] = useState<string>('');
  const [queryUdtBalance, setQueryUdtBalance] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [invalidAddress, setInvalidAddress] = useState<string | null>(null);

  const [networkOptionField, setNetworkOptionField] = useState([]);
  const [defaultNetwork, setDefaultNetwork] = useState('');
  const { mintDCKTokens } = useDCKBTokenHook();
  // useQueryUdtBalance()
  //   .then(response => setQueryUdtBalance(response))
  //   .catch(err => setError(err));

  // useCreateLayer2Address()
  //   .then(response => setDepositAddress(response))
  //   .catch(err => setInvalidAddress(err));

  console.log('queryUdtBalance', queryUdtBalance);
  console.log('depositAddress', depositAddress);
  /*
  TODO
  */
  // setDepositAddress(userAddress)
  const walletBalance = 10001010101;
  const initialAddress = '0xD173313A51f8fc37BcF67569b463abd89d81844f';

  const initialValues: SwapFormValues = {
    amount: '',
    destination_address: initialAddress,
  };

  const onSubmit = async (values: SwapFormValues) => {
    try {
      await mintDCKTokens('dCKB', values.amount, values.destination_address);
    } catch (err) {
      console.log(err);
    }
    console.log({
      amount: values.amount,
      destination_address: values.destination_address,
    });
  };

  function displayErrorsOrSubmit(errors: FormikErrors<SwapFormValues>): string {
    if (errors.amount) {
      return errors.amount;
    }
    if (errors.destination_address) {
      return errors.destination_address;
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
        onSubmit={onSubmit}
        validate={values => {
          console.log(values);
          const errors: FormikErrors<SwapFormValues> = {};
          console.log('errors', errors);
          const amount = Number(values.amount?.toString()?.replace(',', '.'));
          if (!amount) {
            errors.amount = 'Enter an amount';
          } else if (!/^[0-9]*[.,]?[0-9]*$/i.test(amount.toString())) {
            errors.amount = 'Invalid amount';
          } else if (amount < 0) {
            errors.amount = 'Can not be negative';
            if (values.destination_address === '') {
              errors.destination_address = 'Enter a destination address';
            }
            // else if (!isValidAddress(values.destination_address, values.network.baseObject)) {
            //   errors.destination_address = 'Enter a valid destination address';
            // }
            return errors;
          }
        }}
      >
        {formik => (
          <Form>
            <Box display="flex" height="32px" justifyContent="space-between" alignItems="center">
              FROM:{' '}
              <Typography variant="body2">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  minWidth="100px"
                  maxWidth="300px"
                >
                  <Image src="/logos/wallet.png" alt="address:" height="15" width="15" />
                  {formatAddress(userAddress)}
                </Box>
              </Typography>
            </Box>
            <Box display="flex" height="32px">
              <Input
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
                inputMask={{
                  mask: '999 999 999 999',
                  maskChar: '',
                }}
                tooltipMessage="Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum balance of 471 CKB needs to be maintained after transaction."
                // currencyInput={{
                //   decimalsLimit: 2,
                //   groupSeparator: ' ',
                //   suffix: `\u00a0${SUDT_SYMBOL}`,
                //   allowNegativeValue: false,
                //   onValueChange: value => {
                //     const neWValue = parseInt(value, 10);
                //     console.log(neWValue)
                //     if (value === undefined) {
                //       formik.setFieldValue('amount', 0);
                //       return 0;
                //     }
                //     formik.setFieldValue('amount', neWValue)
                //     return value;
                //   },
                // }}
                // error={formik.errors.amount}
                errorMessage={formik.errors.amount}
                required
              />
            </Box>
            <Box display="flex" height="32px" alignItems="center" pt={8}>
              BALANCE:{' '}
              <Typography variant="body1-bold">
                {walletBalance ? (
                  <Box display="flex" alignItems="center" pl={1}>
                    {`${walletBalance} ${SUDT_SYMBOL}`}
                    <Box pl={5}>
                      <DAOPlainButton
                        onClick={() => {
                          formik.setFieldValue('amount', walletBalance);
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
                  <span style={{ color: '#eb0000', paddingLeft: '10px' }}>
                    you do not have dCKB tokens in your account
                  </span>
                )}
              </Typography>
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
                  {formatAddress(formik.values.destination_address) || ' Enter a destination address'}
                </Box>
              </Typography>
            </Box>
            <Box display="flex" height="32px">
              <Input
                icon={{ src: '/logos/nervos.svg' }}
                id="AmountReceive"
                type="text"
                autoComplete="off"
                header="Receive"
                placeholder="Amount you get"
                customStyles={{
                  inputColor: '#00cc9b',
                  headerStyles: { color: '#00cc9b' },
                  borderOnFocus: ' 1px solid #00cc9b',
                }}
                inputMask={{
                  mask: '999 999 999 999',
                  maskChar: '',
                }}
                value={formik.values.amount}
                onChange={formik.handleChange}
                tooltipMessage="Amount you will get after success!"
                // currencyInput={{
                //   decimalsLimit: 2,
                //   groupSeparator: '',
                //   suffix: `\u00a0${SUDT_SYMBOL}`,
                //   allowNegativeValue: false,
                //   onValueChange: value => {
                //     const neWValue = parseInt(value, 10);
                //     console.log(neWValue)
                //     if (value === undefined) {
                //       formik.setFieldValue('amount', 0);
                //       return 0;
                //     }
                //     formik.setFieldValue('amount', neWValue)
                //     return value;
                //   },
                // }}
                errorMessage={formik.errors.amount}
                disabled
              />
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
                  <Input
                    icon={{ src: '/logos/wallet.png' }}
                    id="destination_address"
                    name="destination_address"
                    type="text"
                    autoComplete="off"
                    header="Edit destination address (optional)"
                    placeholder="Nervos layer 2 adress: e.g 0x123...ab56c"
                    value={formik.values.destination_address}
                    onChange={formik.handleChange}
                    customStyles={{
                      inputColor: '#00cc9b',
                      headerStyles: { color: '#00cc9b' },
                      borderOnFocus: '1px solid #00cc9b',
                    }}
                    disabled={initialAddress === ''}
                    tooltipMessage="enter the wallet address you want to send funds, it must be layer 2 wallet address"
                    rightIcon={
                      formik.values.destination_address === initialAddress
                        ? { src: '/logos/x.svg', tooltipMessage: 'Clear address' }
                        : undefined
                    }
                    rightIconOnClick={() => {
                      formik.setFieldValue('destination_address', '');
                    }}
                  />
                </StyledAccordionDetails>
              </StyledAccordionB>
            </AccordionWrapper>
            <label className="block font-medium text-center">Fee TODO</label>
            <Box pt={5}>
              <DAOButton
                variant="gradientOutline"
                type="submit"
                isLoading={formik.isSubmitting}
                disabled={
                  formik.errors.amount != null || formik.errors.destination_address != null || formik.isSubmitting
                }
              >
                {displayErrorsOrSubmit(formik.errors)}
              </DAOButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BridgeComponent;

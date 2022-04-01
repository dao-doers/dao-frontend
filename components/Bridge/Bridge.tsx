import React, { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';

import { selectUserAddress, selectIsLoggedIn } from 'redux/slices/user';

import Selector from 'components/Selector/Selector';
import SelectorOption from 'components/Selector/SelectorOption';
import Input from 'components/Input/Input';
import Box from '@mui/material/Box';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import styled from '@emotion/styled';
import UnstyledSwitches from 'components/Toggle/Toggle';
import { dCKBTransferSchema } from 'validators/minorValidators';
import { Formik, Form, FormikErrors, useFormikContext } from 'formik';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';

import useQueryUdtBalance from 'hooks/useQueryUdtBalance';
import { IBridgeDescriptor, Bridge } from 'interfaces/data';
import useCreateLayer2Address from 'hooks/useCreateLayer2Address';
import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CryptoNetwork } from './models/CryptoNetwork';
import { Currency } from './models/Currency';
import { LayerSwapSettings } from './models/LayerSwapSettings';

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
  padding-top: 100px;
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
  padding-top: 10;
  padding-bottom: 30;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;
interface SwapFormValues {
  amount: string;
  destination_address?: string;
  network?: CryptoNetwork;
  currency?: Currency;
}

interface IBridge {
  settings?: LayerSwapSettings;
  destNetwork?: string;
  destAddress?: string;
  lockAddress?: boolean;
  lockNetwork?: boolean;
  addressSource?: string;
  asset?: string;
}
const SUDT_SYMBOL = 'dCKB';

const BridgeComponent: FC<IBridge> = () => {
  const userAddress = useSelector(selectUserAddress);

  const [depositAddress, setDepositAddress] = useState<string>(null);
  const [destinationAddress, setDestinationAddress] = useState<string>(null);
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

  const availableNetworks = ['Nervos Layer 1', 'Nervos Layer 2'];
  // const initialNetwork = settings.networks
  const initialAddress = depositAddress;
  const initialCurrency = ['CKB'];

  const initialValues: SwapFormValues = {
    amount: '',
    destination_address: initialAddress,
    // network: initialNetwork,
    currency: initialCurrency,
  };
  const onSubmit = async (values: SwapFormValues) => {
    try {
      await mintDCKTokens('dCKB', values.amount, values.destination_address);
    } catch (err) {
      console.log(err);
    }
    console.log({
      amount: Number(values.amount?.toString()?.replace(',', '.')),
      currency: values.currency.name,
      destination_address: values.destination_address,
      network: values.network.id,
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
      <Box display="flex" height="32px">
        <Typography variant="subtitle2">SEND FROM: {userAddress}</Typography>
      </Box>
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
            errors.amount = 'Can\'t be negative';

            if (!values.destination_address) {
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
            <Box display="flex" height="32px">
              <Input
                icon={{ src: '/logos/nervos.svg' }}
                header="Amount"
                placeholder="Enter amount..."
                name="amount"
                id="amount"
                type="number"
                autoComplete="off"
                // onChange={formik.handleChange}
                value={formik.values.amount}
                customStyles={{
                  inputColor: '#00cc9b',
                  headerStyles: { color: '#00cc9b' },
                  borderOnFocus: '#00D395',
                }}
                // inputMask={{
                //   mask: '999 999 999 999',
                //   maskChar: '',
                // }}
                tooltipMessage="Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum balance of 471 CKB needs to be maintained after transaction."
                disableLeftBorderRadius
                currencyInput={{
                  decimalsLimit: 2,
                  groupSeparator: ' ',
                  suffix: `\u00a0${SUDT_SYMBOL}`,
                  allowNegativeValue: false,
                  // intlConfig: { locale: 'de-DE', currency: 'EUR' }
                  onValueChange: value => {
                    if (value === Number.isNaN(value)) {
                      formik.setFieldValue('amount', 0);
                      return 0;
                    }

                    formik.setFieldValue('amount', value);
                    return value;
                  },
                }}
                errorMessage={formik.errors.amount}
                required
              />
            </Box>
            <Box pt={10} pb={1}>
              <Typography variant="subtitle2">SEND TO: {initialAddress}</Typography>
            </Box>
            <Box display="flex" height="32px">
              <Input
                id="AmountReceive"
                type="number"
                autoComplete="off"
                header="Receive"
                placeholder="Amount you get"
                value={formik.values.amount}
                customStyles={{
                  inputColor: '#00cc9b',
                  headerStyles: { color: '#00cc9b' },
                  borderOnFocus: '#00cc9b',
                }}
                // inputMask={{
                //   mask: '999 999 999 999',
                //   maskChar: '',
                // }}
                onChange={formik.handleChange}
                // tooltipMessage="Give me the money!"
                disableLeftBorderRadius
                currencyInput={{
                  decimalsLimit: 2,
                  groupSeparator: ' ',
                  suffix: `\u00a0${SUDT_SYMBOL}`,
                  allowNegativeValue: false,
                  onValueChange: value => {
                    if (value === Number.isNaN(value)) {
                      formik.setFieldValue('amount', 0);
                      return 0;
                    }

                    formik.setFieldValue('amount', value);
                    return value;
                  },
                }}
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
                    header="Destination address (optional)"
                    placeholder="Nervos layer 2 adress: e.g 0x123...ab56c"
                    value={formik.values.destination_address}
                    customStyles={{
                      inputColor: '#00cc9b',
                      headerStyles: { color: '#00cc9b' },
                      borderOnFocus: '#00cc9b',
                    }}
                    disabled={initialAddress === ''}
                    // tooltipMessage=""
                  />
                </StyledAccordionDetails>
              </StyledAccordionB>
            </AccordionWrapper>
            <Box display="flex" justifyContent="space-between" mt={2}>
              {/* <DAOInput
                label="Deposit to get"
                inputProps={{
                  id: 'amount',
                  value: formik.values.amount,
                  onChange: formik.handleChange,
                }}
                formControlProps={{
                  fullWidth: true,
                }}
                error={formik.errors.amount}
              /> */}
            </Box>
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

import React, { useEffect, useState, FC } from 'react';
import Selector from 'components/Selector/Selector';
import SelectorOption from 'components/Selector/SelectorOption';
import Input from 'components/Input/Input';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import UnstyledSwitches from 'components/Toggle/Toggle';
import { dCKBTransferSchema } from 'validators/minorValidators';
import { Formik, Form, FormikErrors, useFormikContext } from 'formik';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';

import useQueryUdtBalance from 'hooks/useQueryUdtBalance';
import { CryptoNetwork } from './models/CryptoNetwork';
import { Currency } from './models/Currency';
import { LayerSwapSettings } from './models/LayerSwapSettings';
import useCreateLayer2Address from 'hooks/useCreateLayer2Address';

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
interface SwapFormValues {
  amount: string;
  destination_address: string;
  network: CryptoNetwork;
  currency: Currency;
}

interface IBridge {
  settings: LayerSwapSettings;
  destNetwork?: string;
  destAddress?: string;
  lockAddress?: boolean;
  lockNetwork?: boolean;
  addressSource?: string;
  asset?: string;
}

const Bridge: FC<IBridge> = () => {
  const [depositAddress, setDepositAddress] = useState<string | null>(null);
  const [queryUdtBalance, setQueryUdtBalance] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [invalidAddress, setInvalidAddress] = useState<string | null>(null);

  const [networkOptionField, setNetworkOptionField] = useState([]);
  const [defaultNetwork, setDefaultNetwork] = useState('');

  useQueryUdtBalance()
    .then(response => setQueryUdtBalance(response))
    .catch(err => setError(err));

  useCreateLayer2Address()
    .then(response => setDepositAddress(response))
    .catch(err => setInvalidAddress(err));

  console.log('queryUdtBalance', queryUdtBalance);
  console.log('depositAddress', depositAddress);

  const availableNetworks = ['CKB', 'Godwoken', 'Ethereum'];
  const initialNetwork = availableNetworks.find(x => x);
  const initialAddress = '0xD173313A51f8fc37BcF67569b463abd89d81844f';
  // const initialCurrency = ['CKB'];
  // const initialCurrency = ['CKB', 'dCKB', 'wCKB'];

  const initialValues: SwapFormValues = {
    amount: '',
    destination_address: initialAddress,
    // network: initialNetwork,
    // currency: initialCurrency,
  };
  const onSubmit = (values: any, actions) => {
    console.log({
      amount: Number(values.amount?.toString()?.replace(',', '.')),
      currency: values.currency.name,
      destination_address: values.destination_address,
      network: values.network.id,
    });
    console.log(actions);
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

  const NetworkOptionField = (networkList): void => {
    const networkSelectorOptions: any = [];
    networkList.forEach(network => {
      networkSelectorOptions.push(
        <SelectorOption
          key={network.id}
          value={network.name}
          label={`${network} (${network})`}
          selected={`${network} (${network})`}
          // icon={{ imgSrc: network.imgSrc }}
        >
          <span>{`${network} (${network})`}</span>
        </SelectorOption>,
      );
    });
    setNetworkOptionField(networkSelectorOptions);
  };
  useEffect(() => {
    NetworkOptionField(availableNetworks);
    setDefaultNetwork(availableNetworks[0])
  }, []);

  return (
    <>
      <Title variant="h2" mb={2}>
        Bridge
      </Title>
      <Box display="flex" height="32px">
        <Typography variant="subtitle2">SEND FROM</Typography>
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
            errors.amount = "Can't be negative";

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
              <div style={{ width: '150px' }}>
                <Selector
                  id="network"
                  placeholder="Choose network..."
                  header="Nervos Network"
                  icon={{ imgSrc: 'assets/images/ethereum-logo.svg' }}
                  customStyles={{
                    placeholderStyles: { color: '#00cc9b' },
                    headerStyles: { color: '#00cc9b' },
                    selectedValueStyles: { color: '#00cc9b' },
                    selectorFocusedBorder: '1px dotted #00cc9b',
                  }}
                  displayOptionIcon
                  allowIconReplacing
                  isWindowed
                  onChange={formik.handleChange}
                  // value={formik.values.network}
                  defaultValue={{
                    value: `${
                      defaultNetwork
                    }`,
                    label: `${defaultNetwork} (${'CKB'
                    })`,
                    selected: `${defaultNetwork} (${'CKB'
                  })`,
                    // icon: (
                      
                    // )
                  }}
                >
                  {networkOptionField}
                </Selector>
              </div>
              <div className="Balance">
                <Input
                  icon={{ imgSrc: 'assets/images/ethereum-logo.svg' }}
                  header="Amount"
                  placeholder="Enter amount..."
                  name="amount"
                  id="amount"
                  type="number"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  // value={formik.values.amount}
                  customStyles={{
                    inputColor: '#00cc9b',
                    headerStyles: { color: '#00cc9b' },
                    borderOnFocus: '#00cc9b',
                  }}
                  // inputMask={{
                  //   mask: '999 999 999 999',
                  //   maskChar: '',
                  // }}
                  // tooltipMessage="Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum balance of 471 CKB needs to be maintained after transaction."
                  disableLeftBorderRadius
                  // currencyInput={{
                  //   decimalsLimit: 2,
                  //   decimalSeparator: '.',
                  //   groupSeparator: ' ',
                  //   suffix: `\u00a0${'CKB'}`,
                  //   allowNegativeValue: false,
                  //   onValueChange: (val: any) => {
                  //     formik.handleChange(val);
                  //     return val;
                  //   },
                  // }}
                  errorMessage={formik.errors.amount}
                  required
                />
              </div>
            </Box>
            <Box pt={10} pb={1}>
              <Typography variant="subtitle2">SEND TO</Typography>
            </Box>
            <Box display="flex" height="32px">
              <div style={{ width: '150px' }}>
                <Selector
                  placeholder="Choose network..."
                  header="Nervos Network"
                  displayOptionIcon
                  allowIconReplacing
                  showDropdownIcon
                  isWindowed
                >
                  <SelectorOption value="Layer 1" label="Layer 1">
                    <span> Layer 1</span>
                  </SelectorOption>
                  <SelectorOption value="Godwoken" label="Godwoken">
                    <span> Godwoken</span>
                  </SelectorOption>
                </Selector>
              </div>
              <Input
                id="AmountReceive"
                type="number"
                autoComplete="off"
                header="AmountReceive"
                placeholder="Amount you get"
                // value={formik.values.amount}
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
                // currencyInput={{
                //   decimalsLimit: 2,
                //   decimalSeparator: ',',
                //   groupSeparator: ' ',
                //   prefix: ' CKB',
                //   allowNegativeValue: false,
                // }}
                errorMessage={formik.errors.amount}
              />
            </Box>
            <Box pt={10} pb={1}>
              <UnstyledSwitches />
            </Box>
            <Input
              id="destination_address"
              name="destination_address"
              type="text"
              autoComplete="off"
              header="Destination address"
              placeholder="Nervos layer 2 adress: e.g 0x123...ab56c"
              customStyles={{
                inputColor: '#00cc9b',
                headerStyles: { color: '#00cc9b' },
                borderOnFocus: '#00cc9b',
              }}
              disabled={initialAddress !== ''}
              // tooltipMessage=""
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <DAOInput
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
              />
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

export default Bridge;

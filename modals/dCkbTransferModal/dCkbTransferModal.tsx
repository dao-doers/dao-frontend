import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import Link from 'components/Link/Link';
import Modal from 'components/Modal/Modal';

import useHandleTransferERC20 from 'hooks/useHandleTransferERC20';

import { EXTERNAL_ROUTES } from 'utils/routes';

import transferUSDTModalSchema from 'validators/transferUSDTModalSchema';

import { selectOpen, setClose } from 'redux/slices/modaldCkbTransfer';
import { selectUserAddress, selectIsLoggedIn } from 'redux/slices/user';

const StyledBox = styled(Box)`
  width: 400px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 80vw;
  }
`;

const TypographyGreen = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 600;
`;

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
`;

const initialValues = {
  receiverAddress: '',
  amount: 0,
};

const DCkbTransferModal: FC = () => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isModalOpen = useSelector(selectOpen);

  const [message, setMessage] = useState('');

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  const onSubmit = async (values: any) => {
    try {
      setMessage('Check transaction status in MetaMask');

      await useHandleTransferERC20(userAddress, values.receiverAddress, values.amount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Transfer dCKB" divider>
      <StyledBox>
        <Typography variant="subtitle2-bold">Transfer dCKB between accounts on Layer 2</Typography>
        <TypographyRed>Important! Check if both accounts exist on:</TypographyRed>
        <Link href={EXTERNAL_ROUTES.CKB_TOOLS} target="_blank">
          https://dev.ckb.tools/create-layer2-account
        </Link>

        <Formik
          validationSchema={transferUSDTModalSchema}
          initialValues={initialValues}
          validateOnChange
          onSubmit={onSubmit}
        >
          {formik => (
            <Form>
              <Box width="100%">
                <Box width="100%" my={2}>
                  <Typography variant="body1-bold">Transfer From: </Typography>
                  <Typography>{userAddress}</Typography>
                </Box>

                <Box width="100%" my={2}>
                  <DAOInput
                    label="Transfer To"
                    inputProps={{
                      id: 'receiverAddress',
                      value: formik.values.receiverAddress,
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.receiverAddress}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="dCKB Amount"
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

                <Box>
                  {!isLoggedIn && <ConnectWalletButton />}

                  {isLoggedIn && message.length === 0 && (
                    <DAOButton variant="gradientOutline" type="submit">
                      Send request
                    </DAOButton>
                  )}

                  {isLoggedIn && message.length > 0 && <TypographyGreen>{message}</TypographyGreen>}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </StyledBox>
    </Modal>
  );
};

export default DCkbTransferModal;

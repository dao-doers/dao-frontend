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
import formatAddress from 'utils/formatAddress';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import transferModalSchema from 'validators/transferModalSchema';

import { selectProvider } from 'redux/slices/main';
import { selectOpen, setClose } from 'redux/slices/modaldCkbTransfer';
import { selectUserAddress, selectIsLoggedIn, selectdckbBalance } from 'redux/slices/user';
import { setOpen, setMessage, setStatus } from 'redux/slices/modalTransaction';

const StyledBox = styled(Box)`
  width: 440px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 80vw;
  }
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

  const provider = useSelector(selectProvider);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isModalOpen = useSelector(selectOpen);
  const dckbBalance = useSelector(selectdckbBalance);

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  const onSubmit = async (values: any) => {
    try {
      dispatch(setOpen(true));
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));

      await useHandleTransferERC20(provider, values.receiverAddress, values.amount);
      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(error.message || error.toString()));
      dispatch(setOpen(false));
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Transfer dCKB" divider>
      <StyledBox>
        <Typography component="h6" variant="h6">
          Transfer dCKB between accounts on Layer 2
        </Typography>

        <TypographyRed>Important! Check if both accounts exist on:</TypographyRed>
        <Link href={EXTERNAL_ROUTES.CKB_TOOLS} target="_blank">
          https://dev.ckb.tools/create-layer2-account
        </Link>

        <Formik
          validationSchema={transferModalSchema}
          initialValues={initialValues}
          validateOnChange
          onSubmit={onSubmit}
        >
          {formik => (
            <Form>
              <Box width="100%" mt={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" mb={1}>
                    Transfering from Layer 2 address
                  </Typography>
                  <Typography variant="body1-bold">{formatAddress(userAddress)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" mb={1}>
                    Current dCKB Layer 2 balance
                  </Typography>
                  <Typography variant="body1-bold">{dckbBalance}</Typography>
                </Box>

                <Box width="100%" my={2}>
                  <DAOInput
                    label="Transfer To"
                    inputProps={{
                      id: 'receiverAddress',
                      value: formik.values.receiverAddress,
                      onChange: formik.handleChange,
                      placeholder: '0x...',
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

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" mb={2}>
                    {/* TODO: add mainnet fee */}
                    Fee
                  </Typography>
                  <Typography variant="body1-bold">0</Typography>
                </Box>

                <Box>
                  {!isLoggedIn && <ConnectWalletButton />}

                  {isLoggedIn && (
                    <DAOButton variant="gradientOutline" type="submit">
                      Send request
                    </DAOButton>
                  )}
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

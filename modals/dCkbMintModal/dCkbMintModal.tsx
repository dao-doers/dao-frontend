import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';

import { selectOpen, setClose } from 'redux/slices/modaldCkbMint';
import { selectPckbBalanceInDao, selectIsLoggedIn } from 'redux/slices/user';

import Typography from '@mui/material/Typography';
import { tributeTokenToWei, tributeTokenToDisplayValue } from 'utils/units';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import { Form, Formik } from 'formik';
import withdrawUnlockedTokensSchema from 'validators/withdrawUnlockedTokens';
import { DCKBToken, MolochV2 } from 'utils/contracts';
import { selectProvider, selectChainId } from 'redux/slices/main';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import PROCESSING_STATUSES from 'enums/processingStatuses';
import LoginStep from './dCkbMintModalSteps/LoginStep';

const StyledBox = styled(Box)`
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 80vw;
  }
`;

const DCkbMintModal: FC = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const isModalOpen = useSelector(selectOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const pckbBalanceInDao = useSelector(selectPckbBalanceInDao);

  const initialValues = {
    amount: 0,
  };

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const token = await DCKBToken(provider, chainId);
      const dao = await MolochV2(provider.getSigner(), chainId);

      if (!dao || !values?.amount) {
        return;
      }

      const tx = await dao.withdrawBalance(token?.address, tributeTokenToWei(values.amount));
      const receipt = await tx.wait();

      if (receipt.blockNumber) {
        dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
        dispatch(setMessage('Your request has been processed by blockchain network.'));
        dispatch(setClose());
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage('Unknown error.'));
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Withdraw unlocked pCKB" divider>
      <StyledBox>
        {!isLoggedIn && <LoginStep />}
        {isLoggedIn && (
          <Formik
            validationSchema={withdrawUnlockedTokensSchema}
            initialValues={initialValues}
            validateOnChange
            onSubmit={onSubmit}
          >
            {formik => (
              <Form>
                <Box width="100%">
                  User pCKB balance in DAO contract available to withdraw:
                  <br />
                  <Typography variant="body1-bold">
                    {pckbBalanceInDao ? tributeTokenToDisplayValue(pckbBalanceInDao) : ''}
                  </Typography>
                  <Box width="100%" mb={2} mt={3}>
                    <DAOInput
                      label="Amount"
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
                  <DAOButton variant="gradientOutline" type="submit" disabled={!formik.isValid}>
                    <Box display="flex" alignItems="center" minWidth={20}>
                      <Typography>Withdraw</Typography>
                    </Box>
                  </DAOButton>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </StyledBox>
    </Modal>
  );
};

export default DCkbMintModal;

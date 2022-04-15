import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAddress,
  selectIsLoggedIn,
  selectbalanceSUDT,
  selectUserAddressLayer2,
  setUserAddressLayer2,
  selectUserCKBAddress,
  setUserCKBAddress,
} from 'redux/slices/user';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import useCheckProvider from 'hooks/useCheckProvider';
import { setOpen, setMessage, setStatus } from 'redux/slices/modalTransaction';

import PROCESSING_STATUSES from 'enums/processingStatuses';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

interface CreateAccountStepProps {
  completeStep: (form: any) => void;
}

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ButtonWrapper = styled(Box)`
  height: 40px;
  min-width: 160px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 15px;
  }
`;

const CreateAccountStep: FC<CreateAccountStepProps> = ({ completeStep }) => {
  const { createLayer2Address, loaderLayer2Address, txnInfoLayer2Address, connectedWalletAddress } = useDCKBTokenHook();
  const hasProvider = useCheckProvider();

  const dispatch = useDispatch();
  const userAddress = useSelector(selectUserAddress);
  const userCKBAddress = useSelector(selectUserCKBAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const depositAddress = useSelector(selectUserAddressLayer2);

  const BalanceSUDT = useSelector(selectbalanceSUDT);
  const Layer2Address = useSelector(selectUserAddressLayer2);

  const getLayer2Address = async () => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));
      dispatch(setMessage(`${loaderLayer2Address.message}`));

      const layer2Address = await createLayer2Address();
      dispatch(setUserAddressLayer2(layer2Address));
      completeStep(layer2Address);

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setMessage(`${loaderLayer2Address.message}\n${txnInfoLayer2Address.txnLink}`));
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(loaderLayer2Address.message || error.message || error.toString()));
    }
  };

  useEffect((): void => {
    const getConnectedWalletAddress = async () => {
      try {
        if (hasProvider && userAddress) {
          const addresses = await connectedWalletAddress();
          dispatch(setUserCKBAddress(addresses));
        }
      } catch (error: any) {
        throw error;
      }
    };
    getConnectedWalletAddress();
    console.log('connectedwalletAddressess', userCKBAddress);
  }, [hasProvider, userAddress]);

  console.log('BalaceSUDT', BalanceSUDT);
  console.log('Layer2Address', Layer2Address);
  console.log('loaderLayer2Address', loaderLayer2Address);
  console.log('txnInfoLayer2Address', txnInfoLayer2Address);
  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        {!depositAddress && (
          <>
            <Box>
              <Typography component="h6" variant="h6" paragraph>
                Create account on Nervos Layer 2
              </Typography>
            </Box>
            <ButtonWrapper>
              {isLoggedIn ? (
                <DAOButton variant="gradientOutline" onClick={() => getLayer2Address()}>
                  Create account
                </DAOButton>
              ) : (
                <ConnectWalletButton />
              )}
            </ButtonWrapper>
          </>
        )}
      </StyledBox>

      <StyledBox>
        <Box>
          {depositAddress ? (
            <Typography component="h6" variant="h6">
              You already have a Nervos Layer 2 account.
            </Typography>
          ) : (
            <Typography component="h6" variant="h6">
              You do not have a Nervos Layer 2 account.
            </Typography>
          )}
        </Box>
        <ButtonWrapper>
          <DAOButton variant="gradientOutline" onClick={() => completeStep(depositAddress)}>
            Next step
          </DAOButton>
        </ButtonWrapper>
      </StyledBox>
      {!depositAddress && (
        <ButtonWrapper>
          <Typography component="h6" variant="h6">
            Your CKB address, (use on faucet site): {userCKBAddress}
          </Typography>
          <DAOButton variant="gradientOutline" onClick={() => window.open('https://faucet.nervos.org/', '_blank')}>
            Layer 1 faucet
          </DAOButton>
        </ButtonWrapper>
      )}
    </Box>
  );
};

export default CreateAccountStep;

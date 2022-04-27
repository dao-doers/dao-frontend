import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';

import DAOButton from 'components/DAOButton/DAOButton';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import useCheckProvider from 'hooks/useCheckProvider';

import formatAddress from 'utils/formatAddress';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { setMessage, setStatus } from 'redux/slices/modalTransaction';

import {
  selectUserAddress,
  selectIsLoggedIn,
  selectbalanceSUDT,
  selectUserLayer2Address,
  setUserLayer2Address,
  selectUserCKBAddress,
  setUserCKBAddress,
} from 'redux/slices/user';

interface CreateAccountStepProps {
  completeStep: (form: any) => void;
}

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ButtonWrapper = styled(Box)`
  height: 40px;
  min-width: 160px;
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 15px;
  }
`;

const StyledCopyIcon = styled(ContentCopyIcon)`
  cursor: pointer;
  font-size: 20px;
  position: relative;
  top: 3px;
`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateAccountStep: FC<CreateAccountStepProps> = ({ completeStep }) => {
  const { createLayer2Address, connectedWalletAddress } = useDCKBTokenHook();
  const hasProvider = useCheckProvider();

  const dispatch = useDispatch();
  const userAddress = useSelector(selectUserAddress);
  const userCKBAddress = useSelector(selectUserCKBAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const depositAddress = useSelector(selectUserLayer2Address);

  const BalanceSUDT = useSelector(selectbalanceSUDT);
  const [copiedCKBAddress, setCopiedCKBAddress] = useState(false);

  const handleCopyCKBAddress = () => {
    setCopiedCKBAddress(true);
    setTimeout(() => {
      setCopiedCKBAddress(false);
    }, 2000);
  };

  const getLayer2Address = async () => {
    try {
      const layer2Address = await createLayer2Address(userAddress);
      dispatch(setUserLayer2Address(layer2Address));
      completeStep(layer2Address);

      const successMessage = `Address successfully created! https://explorer.nervos.org/aggron/${layer2Address}`;

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setMessage(successMessage));
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(error.message || error.toString()));
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
        console.error(error);
      }
    };
    getConnectedWalletAddress();
  }, [hasProvider, userAddress]);

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
        {!depositAddress && (
          <>
            <CopyToClipboard text={userCKBAddress} onCopy={handleCopyCKBAddress}>
              <Box>
                <Typography component="h6" variant="h6">
                  Your CKB address (use on faucet site) {formatAddress(userCKBAddress)}
                </Typography>
                <StyledCopyIcon />
              </Box>
            </CopyToClipboard>
            <ButtonWrapper>
              <DAOButton variant="gradientOutline" onClick={() => window.open('https://faucet.nervos.org/', '_blank')}>
                Layer 1 faucet
              </DAOButton>
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

      <Snackbar open={copiedCKBAddress} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Address copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateAccountStep;

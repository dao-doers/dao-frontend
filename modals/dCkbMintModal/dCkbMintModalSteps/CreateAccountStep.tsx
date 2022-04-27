import React, { FC, useEffect, useState, useCallback } from 'react';
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
import { EXTERNAL_ROUTES } from 'utils/routes';

import PROCESSING_STATUSES from 'enums/processingStatuses';
import APP_MODES from 'enums/appModes';

import { setMessage, setStatus } from 'redux/slices/modalTransaction';
import {
  selectUserAddress,
  selectIsLoggedIn,
  selectCktLayer1Address,
  selectCktLayer2Address,
  selectckbBalance,
  setCktLayer1Address,
  setCktLayer2Address,
  setckbBalance,
} from 'redux/slices/user';

interface CreateAccountStepProps {
  completeStep: (form: any) => void;
}

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonWrapper = styled(Box)`
  height: 40px;
  min-width: 160px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 20px;
    width: 100%;
  }
`;

const StyledCopyIcon = styled(ContentCopyIcon)`
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.colors.col1};
  margin-left: 5px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
`;

const NavButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateAccountStep: FC<CreateAccountStepProps> = ({ completeStep }) => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const cktLayer1Address = useSelector(selectCktLayer1Address);
  const cktLayer2Address = useSelector(selectCktLayer2Address);
  const ckbBalance = useSelector(selectckbBalance);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const hasProvider = useCheckProvider();
  const { createLayer2Account, connectedWalletAddress, getLayer2Address } = useDCKBTokenHook();

  const [copiedCKBAddress, setCopiedCKBAddress] = useState(false);

  const runCheckLayer2CKBAccountBalance = useCallback(async () => {
    const response = await fetch(process.env.PROVIDER_URL || '', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [userAddress, 'latest'],
      }),
      mode: 'cors',
    });

    const json = await response.json();
    // eslint-disable-next-line radix
    dispatch(setckbBalance(parseInt(json.result)));
  }, [userAddress]);

  const runGetLayer1Address = async () => {
    try {
      if (hasProvider && userAddress) {
        const addresses = await connectedWalletAddress();
        dispatch(setCktLayer1Address(addresses));
      }
    } catch (error: any) {
      // TODO: display error in some way
    }
  };

  const runGetLayer2Address = async () => {
    try {
      const layer2Address = await getLayer2Address(userAddress);
      dispatch(setCktLayer2Address(layer2Address));
    } catch (error: any) {
      // TODO: display error in some way
    }
  };

  const handleCreateLayer2Account = async () => {
    try {
      const layer2Address = await createLayer2Account(userAddress);
      dispatch(setCktLayer2Address(layer2Address));
      completeStep(layer2Address);

      const successMessage = `Address successfully created! ${process.env.EXPLORER}/${layer2Address}`;

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setMessage(successMessage));
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(error.message || error.toString()));
    }
  };

  useEffect((): void => {
    runGetLayer1Address();
    runCheckLayer2CKBAccountBalance();
  }, [hasProvider, userAddress]);

  useEffect((): void => {
    if (ckbBalance > 0) {
      runGetLayer2Address();
    }
  }, [ckbBalance]);

  const handleCopy = () => {
    setCopiedCKBAddress(true);
    setTimeout(() => {
      setCopiedCKBAddress(false);
    }, 2000);
  };

  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        {ckbBalance === 0 && (
          <>
            <Box>
              <Typography component="h6" variant="h6">
                Create account on Nervos Layer 2
              </Typography>
              <Typography>You must have at least 462 CKB on your Layer 1 account to create Layer 2 account.</Typography>
            </Box>
            <ButtonWrapper>
              {isLoggedIn ? (
                <DAOButton variant="gradientOutline" onClick={() => handleCreateLayer2Account()}>
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
        {ckbBalance === 0 && process.env.MODE === APP_MODES.DEV && (
          <>
            <Box>
              <Typography component="h6" variant="h6">
                Use Nervos Faucet to get free CKB
              </Typography>
              <Typography>Paste this address on faucet site:</Typography>
              <CopyToClipboard text={cktLayer1Address} onCopy={handleCopy}>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                  <TypographyBlue>{formatAddress(cktLayer1Address)}</TypographyBlue>
                  <StyledCopyIcon />
                </Box>
              </CopyToClipboard>
            </Box>
            <ButtonWrapper>
              <DAOButton variant="gradientOutline" onClick={() => window.open(EXTERNAL_ROUTES.NERVOS_FAUCET, '_blank')}>
                Layer 1 faucet
              </DAOButton>
            </ButtonWrapper>
          </>
        )}

        {ckbBalance > 0 && (
          <Box>
            <Typography component="h6" variant="h6">
              You already have a Nervos Layer 2 account.
            </Typography>
            <CopyToClipboard text={cktLayer2Address} onCopy={handleCopy}>
              <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                <Typography mr={1}>Here is your address:</Typography>
                <TypographyBlue>{formatAddress(cktLayer2Address)}</TypographyBlue>
                <StyledCopyIcon />
              </Box>
            </CopyToClipboard>
          </Box>
        )}
      </StyledBox>

      <NavButtonsWrapper>
        <div />
        <Box width="48%">
          <DAOButton variant="gradientOutline" onClick={() => completeStep(cktLayer2Address)}>
            Next step
          </DAOButton>
        </Box>
      </NavButtonsWrapper>

      <Snackbar open={copiedCKBAddress} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Address copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateAccountStep;

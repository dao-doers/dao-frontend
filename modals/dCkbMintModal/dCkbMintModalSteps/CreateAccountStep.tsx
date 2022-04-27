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
  selectCktLayer2Address,
  setCktLayer2Address,
  selectCktLayer1Address,
  setCktLayer1Address,
} from 'redux/slices/user';
import APP_MODES from 'enums/appModes';

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
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const hasProvider = useCheckProvider();
  const { createLayer2Account, connectedWalletAddress, getLayer2Address } = useDCKBTokenHook();

  const [copiedCKBAddress, setCopiedCKBAddress] = useState(false);

  const runGetLayer1Address = async () => {
    try {
      if (hasProvider && userAddress) {
        const addresses = await connectedWalletAddress();
        dispatch(setCktLayer1Address(addresses));
      }
    } catch (error: any) {
      console.error(error);
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

      const successMessage = `Address successfully created! https://explorer.nervos.org/aggron/${layer2Address}`;

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(setMessage(successMessage));
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(error.message || error.toString()));
    }
  };

  useEffect((): void => {
    runGetLayer1Address();
    runGetLayer2Address();
  }, [hasProvider, userAddress]);

  const handleCopyCKBAddress = () => {
    setCopiedCKBAddress(true);
    setTimeout(() => {
      setCopiedCKBAddress(false);
    }, 2000);
  };

  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        {!cktLayer2Address && (
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
        {!cktLayer2Address && process.env.MODE === APP_MODES.DEV && (
          <>
            <Box>
              <Typography component="h6" variant="h6">
                Use Nervos Faucet to get free CKB
              </Typography>
              <Typography>Paste this address on faucet site:</Typography>
              <CopyToClipboard text={cktLayer1Address} onCopy={handleCopyCKBAddress}>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                  <TypographyBlue>{formatAddress(cktLayer1Address)}</TypographyBlue>
                  <StyledCopyIcon />
                </Box>
              </CopyToClipboard>
            </Box>
            <ButtonWrapper>
              <DAOButton variant="gradientOutline" onClick={() => window.open('https://faucet.nervos.org/', '_blank')}>
                Layer 1 faucet
              </DAOButton>
            </ButtonWrapper>
          </>
        )}

        {cktLayer2Address && (
          <Box>
            <Typography component="h6" variant="h6">
              You already have a Nervos Layer 2 account.
            </Typography>
            <Typography>Here is your address: {formatAddress(cktLayer2Address)}</Typography>
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

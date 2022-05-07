import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';
import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';

import { selectOpen, setClose } from 'redux/slices/modaldCkbMint';
import { selectIsLoggedIn } from 'redux/slices/user';

import CreateAccountStep from './dCkbMintModalSteps/CreateAccountStep';
import GetCKBStep from './dCkbMintModalSteps/GetCKBStep';
import ReceivedCKBStep from './dCkbMintModalSteps/ReceivedCKBStep';
import BridgeStep from './dCkbMintModalSteps/BridgeStep';
import LoginStep from './dCkbMintModalSteps/LoginStep';

const StyledBox = styled(Box)`
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 80vw;
  }
`;

const DCkbMintModal: FC = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(selectOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [activeStep, setActiveStep] = useState(0);

  const handleModalOpen = () => {
    dispatch(setClose());
    setActiveStep(0);
  };

  const nextStep = (): void => {
    setActiveStep(prevState => {
      return prevState + 1;
    });
  };

  const previousStep = (): void => {
    setActiveStep(prevState => {
      return prevState - 1;
    });
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Get dCKB" divider>
      <StyledBox>
        {!isLoggedIn && <LoginStep />}
        {isLoggedIn && (
          <Stepper nonLinear interactive activeStep={activeStep}>
            <Step label="Get Layer 2 address">
              <CreateAccountStep completeStep={() => nextStep()} />
            </Step>

            <Step label="Get CKB">
              <GetCKBStep handlePreviousStep={() => previousStep()} completeStep={() => nextStep()} />
            </Step>

            <Step label="Receive dCKB">
              <ReceivedCKBStep handlePreviousStep={() => previousStep()} completeStep={() => nextStep()} />
            </Step>

            <Step label="Transfer dCKB to Layer2">
              <BridgeStep handlePreviousStep={() => previousStep()} completeStep={() => nextStep()} />
            </Step>
          </Stepper>
        )}
      </StyledBox>
    </Modal>
  );
};

export default DCkbMintModal;

import { FC, useRef } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';

import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';

import CreateAccountStep from './WireTestnetModalSteps/CreateAccountStep';
import GetCKBStep from './WireTestnetModalSteps/GetCKBStep';
import ReceivedCKBStep from './WireTestnetModalSteps/ReceivedCKBStep';
import BridgeStep from './WireTestnetModalSteps/BridgeStep';

interface IStepperModal {
  isModalOpen: boolean;
  isModalClose: () => void;
}

const StyledBox = styled(Box)`
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 80vw;
  }
`;

const WireTestnetModal: FC<IStepperModal> = ({ isModalOpen, isModalClose }) => {
  const childRef = useRef<any>(null);

  return (
    <Modal isOpen={isModalOpen} handleClose={isModalClose} title="Get dCKB" divider>
      <StyledBox>
        <Stepper nonLinear interactive ref={childRef}>
          <Step label="Get Layer 2 address">
            <CreateAccountStep handleNextStep={() => childRef.current.nextStep()} />
          </Step>

          <Step label="Get CKB">
            <GetCKBStep
              handlePreviousStep={() => childRef.current.previousStep()}
              handleNextStep={() => childRef.current.nextStep()}
            />
          </Step>

          <Step label="Receive dCKB">
            <ReceivedCKBStep
              handlePreviousStep={() => childRef.current.previousStep()}
              handleNextStep={() => childRef.current.nextStep()}
            />
          </Step>

          <Step label="Transfer dCKB to Layer2">
            <BridgeStep handlePreviousStep={() => childRef.current.previousStep()} />
          </Step>
        </Stepper>
      </StyledBox>
    </Modal>
  );
};

export default WireTestnetModal;

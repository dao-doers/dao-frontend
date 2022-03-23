import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';
import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';

import { selectOpen, setClose } from 'redux/slices/modalWireddCKB';

import CreateAccountStep from './WireddCKBModalSteps/CreateAccountStep';
import GetCKBStep from './WireddCKBModalSteps/GetCKBStep';
import DepositCKBStep from './WireddCKBModalSteps/DepositCKBStep';
import BridgeStep from './WireddCKBModalSteps/BridgeStep';

const StyledBox = styled(Box)`
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 80vw;
  }
`;

const WireddCKBModal: FC = () => {
  const childRef = useRef<any>(null);

  const dispatch = useDispatch();

  const isModalOpen = useSelector(selectOpen);

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  return (
    <Modal isOpen={true} handleClose={handleModalOpen} title="Get dCKB" divider>
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
            <DepositCKBStep
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

export default WireddCKBModal;

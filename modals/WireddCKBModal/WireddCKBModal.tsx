import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAddressLayer2, selectbalanceSUDT } from 'redux/slices/user';
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
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0, 0, 0, 0]);

  const dispatch = useDispatch();

  const Layer2Address = useSelector(selectUserAddressLayer2);
  const balanceSUDT = useSelector(selectbalanceSUDT);
  const isModalOpen = useSelector(selectOpen);

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  const nextStep = (): void => {
    setActiveStep(prevState => {
      if (prevState === completedSteps.length - 1) {
        return 0;
      }
      return prevState + 1;
    });
  };

  const previousStep = (): void => {
    setActiveStep(prevState => {
      return prevState - 1;
    });
  };

  const completeStep = (changeStep?: boolean): void => {
    const newState = completedSteps.slice();
    newState[activeStep] = 1;
    setCompletedSteps(newState);
    if (changeStep) {
      nextStep();
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Get dCKB" divider>
      <StyledBox>
        <Stepper
          onStepChange={(active, previous) => {
            if (active === 1) {
              if (Layer2Address) {
                setCompletedSteps([1, 0, 0, 0]);
              }
            } else if (active === 2) {
              if (balanceSUDT.ckbBalance > 471) {
                setCompletedSteps([1, 1, 0, 0]);
              }
            } else if (active === 3) {
              if (balanceSUDT.dckbBalance > 0) {
                setCompletedSteps([1, 1, 1, 0]);
              }
            } else {
              setCompletedSteps([0, 0, 0, 0]);
              setActiveStep(0);
            }
          }}
          nonLinear
          interactive
          activeStep={activeStep}
          completedSteps={completedSteps}
          onComplete={() => completeStep(true)}
        >
          <Step label="Get Layer 2 address">
            <CreateAccountStep handleNextStep={() => nextStep()} />
          </Step>

          <Step label="Get CKB">
            <GetCKBStep handlePreviousStep={() => previousStep()} handleNextStep={() => nextStep()} />
          </Step>

          <Step label="Receive dCKB">
            <DepositCKBStep handlePreviousStep={() => previousStep()} handleNextStep={() => nextStep()} />
          </Step>

          <Step label="Transfer dCKB to Layer2">
            <BridgeStep handlePreviousStep={() => previousStep()} />
          </Step>
        </Stepper>
      </StyledBox>
    </Modal>
  );
};

export default WireddCKBModal;

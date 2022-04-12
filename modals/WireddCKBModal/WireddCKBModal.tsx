import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';
import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';

import { selectOpen, setClose } from 'redux/slices/modalWireddCKB';

import { selectUserAddressLayer2 } from 'redux/slices/user';
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
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0, 0, 0, 0]);
  const [initialRender, setInitialRender] = useState(true);

  const dispatch = useDispatch();

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

  const completeStep = (): void => {
    const newState = completedSteps.slice();
    newState[activeStep] = 1;
    setCompletedSteps(newState);
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      nextStep();
    }
  }, [JSON.stringify(completedSteps)]);

  const Layer2Address = useSelector(selectUserAddressLayer2);

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Get dCKB" divider>
      <StyledBox>
        <Stepper
          onStepChange={(activeStep, previousStep) => {
            console.log('Changed from step ', previousStep, ' to step ', activeStep, '.');
            if (activeStep === 1) {
              if (Layer2Address) {
                setCompletedSteps([1, 0, 0, 0])
                setActiveStep(1);
              }
            } else if (activeStep === 2) {
            } else {
            }
          }}
          nonLinear
          interactive
          ref={childRef}
          activeStep={activeStep}
          completedSteps={completedSteps}
          onComplete={() => console.log('Submitted!')}
        >
          <Step label="Get Layer 2 address">
            <CreateAccountStep handleNextStep={() => nextStep()} />
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

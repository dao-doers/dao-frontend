import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';
import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { selectOpen, setClose } from 'redux/slices/modaldCkbMint';
import { setOpen, setMessage, setStatus } from 'redux/slices/modalTransaction';
import { selectCktLayer2Address, selectbalanceSUDT, selectIsLoggedIn } from 'redux/slices/user';

import CreateAccountStep from './dCkbMintModalSteps/CreateAccountStep';
import GetCKBStep from './dCkbMintModalSteps/GetCKBStep';
import DepositCKBStep from './dCkbMintModalSteps/DepositCKBStep';
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

  const Layer2Address = useSelector(selectCktLayer2Address);
  const balanceSUDT = useSelector(selectbalanceSUDT);
  const isModalOpen = useSelector(selectOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0, 0, 0, 0]);

  const handleModalOpen = () => {
    dispatch(setClose());
  };

  const nextStep = (completed): void => {
    setActiveStep(prevState => {
      if (prevState === completed.length - 1) {
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

  const completeStep = (completed, setCompleted, changeStep?: boolean): void => {
    const newState = completedSteps.slice();
    newState[activeStep] = 1;
    setCompletedSteps(newState);
    if (changeStep) {
      nextStep(completedSteps);
    }
  };

  const resetSteps = (): void => {
    if (activeStep !== 0 || completedSteps[0] === 1) {
      setActiveStep(0);
      setCompletedSteps([0, 0, 0, 0]);
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen} title="Get dCKB" divider>
      <StyledBox>
        {!isLoggedIn && <LoginStep />}
        {isLoggedIn && (
          <Stepper
            // IF USER HAS ALREADY SOME STEPS COMPLETED
            // onStepChange={(active, previous) => {
            //   if (active === 0) {
            //     if (Layer2Address) {
            //       setCompletedSteps([1, 0, 0, 0]);
            //     }
            //   } else if (active === 1) {
            //     if (balanceSUDT.ckbBalance > 471) {
            //       setCompletedSteps([0, 1, 0, 0]);
            //     }
            //   } else if (active === 2) {
            //     if (balanceSUDT.dckbBalance > 0) {
            //       setCompletedSteps([0, 0, 1, 0]);
            //     }
            //   } else if (active === 3) {
            //     setCompletedSteps([0, 0, 0, 1]);
            //   } else {
            //     setCompletedSteps([1, 1, 1, 1]);
            //   }
            // }}
            nonLinear
            interactive
            activeStep={activeStep}
            completedSteps={completedSteps}
            onComplete={() => {
              dispatch(setOpen(true));
              dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
              dispatch(
                setMessage(
                  `Congratulation!, you completed all steps!\n${balanceSUDT?.ckbBalance}CKB\n${balanceSUDT?.dckbBalance}dCKB\n`,
                ),
              );
            }}
          >
            <Step label="Get Layer 2 address">
              <CreateAccountStep
                completeStep={() => {
                  completeStep(completedSteps, setCompletedSteps, true);
                }}
              />
            </Step>

            <Step label="Get CKB">
              <GetCKBStep
                handlePreviousStep={() => previousStep()}
                completeStep={() => {
                  completeStep(completedSteps, setCompletedSteps, true);
                }}
              />
            </Step>

            <Step label="Receive dCKB">
              <DepositCKBStep
                handlePreviousStep={() => previousStep()}
                completeStep={() => {
                  completeStep(completedSteps, setCompletedSteps, true);
                }}
              />
            </Step>

            <Step label="Transfer dCKB to Layer2">
              <BridgeStep
                handlePreviousStep={() => previousStep()}
                completeStep={() => {
                  completeStep(completedSteps, setCompletedSteps, false);
                }}
                resetSteps={() => {
                  resetSteps();
                }}
              />
            </Step>
          </Stepper>
        )}
      </StyledBox>
    </Modal>
  );
};

export default DCkbMintModal;

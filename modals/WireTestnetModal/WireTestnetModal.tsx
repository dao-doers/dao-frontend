import { FC, useRef } from 'react';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';
import DAOButton from 'components/DAOButton/DAOButton';

import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';
import Typography from '@mui/material/Typography';
import DividerLine from 'components/DividerLine/DividerLine';
import DAOInput from 'components/DAOInput/DAOInput';

interface IStepperModal {
  isModalOpen: boolean;
  isModalClose: () => void;
}

/* 
  TODO 
  refactor will come,need to thing about button, we dont need to much. Each step don't need all.
*/
const WireTestnetModal: FC<IStepperModal> = ({ isModalOpen, isModalClose }) => {
  const childRef = useRef<any>(null);

  const handleTransactionModal = () => {
    if (childRef.current.completeStep()) {
      isModalClose();
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleTransactionModal}>
      <Box>
        <Stepper
          nonLinear
          interactive
          ref={childRef}
          onComplete={() => console.log('Submitted!')}
          onStepChange={(activeStep, previousStep) =>
            console.log('Changed from step ', previousStep, ' to step ', activeStep, '.')
          }
          onStepComplete={completedStep => console.log('Step ', completedStep, ' completed!')}
        >
          <Step label="Create wallet address on Layer 2" optional>
            <Box mt={2} mb={2}>
              <Typography component="h5" variant="h5" align="center" paragraph>
                Create account on Nervos Layer 2
              </Typography>
              <Typography component="h6" align="center" paragraph>
                to complete this step click on the button, you will be taken to an external page where you will be able
                to create your account address on leyer 2
              </Typography>
              <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
                <DAOButton
                  variant="gradientOutline"
                  onClick={() => window.open('https://dev.ckb.tools/create-layer2-account', '_blank')}
                >
                  CREATE ACCOUNT
                </DAOButton>
              </Box>
              <Typography variant="h6" align="center" paragraph>
                If You already have a Nervos Layer 2 account with CKB, please submit step.
              </Typography>
            </Box>
          </Step>

          <Step label="Get CKB from Layer 1" optional>
            <Box mt={2} mb={2}>
              <Typography component="h5" variant="h5" align="center" paragraph>
                Get CKB from Layer 1
              </Typography>
              <Typography component="h6" align="center" paragraph>
                Go to NexisDAO and connect with metamask. Next, copy CKB address (copy button here or) from top left of
                NexisDAO page. Get CKB from Layer 1 faucet (https://faucet.nervos.org/) by pasting the CKB address from
                step one
              </Typography>
              <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
                <DAOButton
                  variant="gradientOutline"
                  onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}
                >
                  NexisDAO page
                </DAOButton>
              </Box>
              <Typography variant="h6" align="center" paragraph>
                Get CKB from Layer 1 faucet by pasting the CKB address from NexisDAO page
              </Typography>
              <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
                <DAOButton
                  variant="gradientOutline"
                  onClick={() => window.open('https://faucet.nervos.org/', '_blank')}
                >
                  Layer 1 faucet
                </DAOButton>
              </Box>
            </Box>
          </Step>

          <Step label="Receive dCKB">
            <Box mt={2} mb={2}>
              <Typography component="h5" variant="h5" align="center" paragraph>
                Stake CKB via NexisDAO
              </Typography>
              <Typography component="h6" align="center" paragraph>
                On NexisDAO Page, fill in the form field as much as you would like to deposit from your total balance,
                the tokens will be locked for 1 month and you will get an equivalent in dCKB, next press the Mint
                button.
              </Typography>
              <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
                <DAOButton
                  variant="gradientOutline"
                  onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}
                >
                  Stake CKB
                </DAOButton>
              </Box>
            </Box>
          </Step>

          <Step label="Transfer dCKB to Layer2">
            <Box mt={2} mb={2}>
              <Typography component="h5" variant="h5" align="center" paragraph>
                Transfer dCKB to Layer2
              </Typography>
              <Typography component="h6" align="center" paragraph>
                Please make sure you have sufficient CKB balance in your L1 account before transferring to L2. A minimum
                balance of 471 CKB needs to be maintained.
              </Typography>
              <DAOInput
                label="Transfer"
                inputProps={{
                  id: 'Transfer',
                  // value: values.transfer,
                  // onChange: handleChange,
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <Box pt={2} pb={2} display="flex" alignItems="center" justifyContent="center">
                <DAOButton
                  variant="gradientOutline"
                  onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}
                >
                  Wait for Layer 1 balance to be founded.
                </DAOButton>
              </Box>
            </Box>
          </Step>

          <Step label="Summary">
            <Box mt={2} mb={2}>
              <Typography component="h5" variant="h5" align="center" paragraph>
                Check dCKB balance on Layer 2
              </Typography>
            </Box>
          </Step>
        </Stepper>

        <DAOButton onClick={() => childRef.current.completeStep()}>Submit step</DAOButton>
        <DAOButton onClick={() => childRef.current.resetSteps()}>Reset</DAOButton>
        <DAOButton onClick={() => childRef.current.nextStep()}>Next</DAOButton>
        <DAOButton onClick={() => childRef.current.previousStep()}>Previous</DAOButton>
        <DividerLine />
        <DAOButton onClick={() => isModalClose()}>Close Modal</DAOButton>
      </Box>
    </Modal>
  );
};

export default WireTestnetModal;

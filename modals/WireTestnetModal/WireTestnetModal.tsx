import { FC, useRef, useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { selectUserAddress } from 'redux/slices/user';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Modal from 'components/Modal/Modal';
import DAOButton from 'components/DAOButton/DAOButton';

import Stepper from 'components/Steper/Stepper';
import Step from 'components/Steper/Step';
import Typography from '@mui/material/Typography';

import useERC20Contract from 'hooks/useERC20Contract';
import config from 'config/config';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import CreateAccountStep from './WireTestnetModalSteps/CreateAccountStep';
import GetCKBStep from './WireTestnetModalSteps/GetCKBStep';
import ReceiveCKBStep from './WireTestnetModalSteps/ReceiveCKBStep';
import BridgeStep from './WireTestnetModalSteps/BridgeStep';
import SummaryStep from './WireTestnetModalSteps/SummaryStep';

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

  const userAddress = useSelector(selectUserAddress);

  const erc20 = useERC20Contract(config.nervos.SUDT_PROXY_CONTRACT_ADDRESS);

  const [transferValue, setTransferValue] = useState<number>(0);
  const [latestTransactionHash, setLatestTransactionHash] = useState<string | null>(null);

  console.log('transferValue', transferValue);

  const deposit = async () => {
    console.log('deposit');
    const decimals = await erc20?.methods.decimals().call();
    if (decimals) {
      const weiTransferValue = Web3.utils.toBN(transferValue).mul(Web3.utils.toBN(10).pow(Web3.utils.toBN(decimals)));
      console.log('deposit amount', weiTransferValue.toString());
      const transactionHash = await erc20?.methods.deposit().send({ from: userAddress, value: weiTransferValue });
      console.log('transaction hash', transactionHash);
      setLatestTransactionHash(transactionHash);

      const balance = await erc20?.methods.balanceOf(userAddress).call();
      console.log('balance', balance);
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={isModalClose} title="Get dCKB" divider>
      <StyledBox>
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
          <Step label="Get Layer 2 address">
            <CreateAccountStep handleNextStep={() => childRef.current.completeStep()} />
          </Step>

          <Step label="Get CKB">
            <GetCKBStep />
            <Box pt={2} pb={2} display="flex">
              <DAOButton variant="gradientOutline" onClick={() => childRef.current.previousStep()}>
                Go Back
              </DAOButton>
              <Box padding={1} />
              <DAOButton variant="gradientOutline" onClick={() => childRef.current.completeStep()}>
                Continue
              </DAOButton>
            </Box>
          </Step>

          <Step label="Receive dCKB">
            <ReceiveCKBStep />
            <Box pt={2} pb={2} display="flex">
              <DAOButton variant="gradientOutline" onClick={() => childRef.current.previousStep()}>
                Go Back
              </DAOButton>
              <Box padding={1} />
              <DAOButton variant="gradientOutline" onClick={() => childRef.current.completeStep()}>
                Continue
              </DAOButton>
            </Box>
          </Step>

          <Step label="Transfer dCKB to Layer2">
            <BridgeStep onChange={value => setTransferValue(value)} value={transferValue} />
            <DAOButton variant="gradientOutline" onClick={() => childRef.current.completeStep()}>
              Continue
            </DAOButton>
          </Step>

          <Step label="Summary">
            <SummaryStep />
            <DAOButton onClick={() => childRef.current.previousStep()}>Go Back</DAOButton>
            <DAOButton onClick={() => childRef.current.resetSteps()}>Reset Steps</DAOButton>
          </Step>
        </Stepper>
      </StyledBox>
    </Modal>
  );
};

export default WireTestnetModal;

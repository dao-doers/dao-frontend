import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import BridgeComponent from 'components/Bridge/Bridge';
import DAOTooltip from 'components/DAOTooltip/DAOTooltip';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';
import SyncIcon from '@mui/icons-material/Sync';

interface IBridge {
  handlePreviousStep: () => void;
  completeStep: (form: any) => void;
  resetSteps: () => void;
}

const NavButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BridgeStep: FC<IBridge> = ({ handlePreviousStep, completeStep, resetSteps }) => {
  return (
    <Box mt={5} mb={4}>
      <BridgeComponent onSubmitCompleteStep={completeStep} />

      <NavButtonsWrapper>
        <Box width="48%">
          <DAOButton onClick={handlePreviousStep}>Previous step</DAOButton>
        </Box>
        <Box>
          <DAOPlainButton variant="gradientOutline" onClick={resetSteps}>
            <DAOTooltip tooltipStyles={{ borderRadius: '10px' }} backgroundColor="#eb0000" message="Reset all steps">
              <SyncIcon />
            </DAOTooltip>
          </DAOPlainButton>
        </Box>
      </NavButtonsWrapper>
    </Box>
  );
};

export default BridgeStep;

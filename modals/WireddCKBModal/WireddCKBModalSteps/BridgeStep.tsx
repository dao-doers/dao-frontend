import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import BridgeComponent from 'components/Bridge/Bridge';

interface IBridge {
  handlePreviousStep: () => void;
  completeStep: (form: any) => void;
}

const NavButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BridgeStep: FC<IBridge> = ({ handlePreviousStep, completeStep }) => {
  return (
    <Box mt={5} mb={4}>
      <BridgeComponent onSubmitCompleteStep={completeStep} />

      <NavButtonsWrapper>
        <Box width="48%">
          <DAOButton onClick={handlePreviousStep}>Previous step</DAOButton>
        </Box>
      </NavButtonsWrapper>
    </Box>
  );
};

export default BridgeStep;

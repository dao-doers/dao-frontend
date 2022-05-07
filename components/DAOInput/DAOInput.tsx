import { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import TooltipIcon from 'components/TooltipIcon';

interface DAOInputProps {
  label?: string;
  formControlProps: FormControlProps;
  inputProps: TextFieldProps;
  error?: string | undefined;
  tootltip?: string;
}

const StyledFormControl = styled(FormControl)`
  position: relative;
`;

const StyledTextField = styled(TextField)`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.colors.main4};
`;

const LabelBox = styled(Box)`
  position: absolute;
  top: -9px;
  left: 10px;
  z-index: 10;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const TypographyGrey = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main6};
`;

const DAOInput: FC<DAOInputProps> = ({ label, formControlProps, inputProps, error, tootltip }) => {
  return (
    <StyledFormControl fullWidth variant="outlined" {...formControlProps}>
      {label && (
        <LabelBox px={1}>
          <Box display="flex">
            <TypographyGrey variant="body2" mr={1}>
              {label}
            </TypographyGrey>
            {tootltip && (
              <TooltipIcon>
                <Typography variant="body2">{tootltip}</Typography>
              </TooltipIcon>
            )}
          </Box>
        </LabelBox>
      )}
      <StyledTextField type="text" autoComplete="off" {...inputProps} />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </StyledFormControl>
  );
};

export default DAOInput;

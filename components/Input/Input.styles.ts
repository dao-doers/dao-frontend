import styled from '@emotion/styled';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CurrencyInput from 'react-currency-input-field';

export const InputOuterContainer = styled.div`
  width: 100%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const CurrencyInputStyle = styled(CurrencyInput)`
  border: none;
  outline: none;
  height: 32px;
  font-size: 1em;
  color: #474747e0;
  padding: 2px 4px 2px 0px;
  min-height: 28px;
  font-weight: 300;
  letter-spacing: 1px;
  width: 100%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

export const InputMainContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #eef2f2;
  padding: 0;
`;

export const InputIcon = styled.div`
  background-color: #fff;
  padding: 1px;
  display: flex;
  align-items: center;
  min-width: 65px;
  max-width: 80px;
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 50px;
  box-sizing: border-box;
`;

export const InputRightContainer = styled.div`
  background-color: #fff;
  flex-grow: 3;
  box-sizing: border-box;
`;

export const InputHeader = styled.div`
  text-align: left;
  font-size: 0.75em;
  letter-spacing: 0px;
  color: #5a7681;
  padding-top: 4px;
  padding-bottom: 0;
`;

export const RightIcon = styled.div`
  padding: 1px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  min-width: 65px;
  max-width: 80px;
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 50px;
  box-sizing: border-box;
  background-color: #fff;
  &:hover {
    cursor: pointer;
  }
`;
export const InputTextField = styled.div`
  padding-bottom: 4px;
`;

export const InputNoIcon = styled.div`
  padding-left: 16px;
`;

export const ShowPasswordIcon = styled(IconButton)`
  margin-right: 10px;
`;

export const InputTooltip = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  background-color: #fff;
  cursor: pointer;
  padding-right: 10px;
  color: #383838;
  outline: none;
`;

export const InputMessages = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 12px;
  font-size: 0.75em;
`;

export const InputErrorMessage = styled.span`
  padding: 12px;
  color: #eb0000;
  font-size: 0.75em;
`;

export const InputRequired = styled.span`
  color: #eb0000;
`;

export const InputPrefix = styled(InputAdornment)`
  padding: 10px;
`;

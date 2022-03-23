/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputMask, { InputState } from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';
import Image from 'next/image';
import { Tooltip } from '@mui/material';
import styled from '@emotion/styled';
import MoneyIcon from '@mui/icons-material/Money';

const InputOuterContainer = styled.div`
  width: 100%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const CurrencyInputStyle = styled(CurrencyInput)`
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

const InputMainContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  border: 0.063rem solid rgb(0, 0, 0);
  padding: 0;
`;

const InputIcon = styled.div`
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

const InputRightContainer = styled.div`
  background-color: #fff;
  flex-grow: 3;
  box-sizing: border-box;
`;

const InputHeader = styled.div`
  background-color: #fff;
  flex-grow: 3;
  box-sizing: border-box;
`;

const RightIcon = styled.div`
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
  &:hover {
    cursor: pointer;
  }
`;
const InputTextField = styled.div`
  padding-bottom: 4px;
`;

const InputNoIcon = styled.div`
  padding-bottom: 4px;
`;
const noIcon = styled.div`
  padding-bottom: 4px;
`;
const withIcon = styled.div`
  min-width: 250px;
`;

const NoLeftBorderRadius = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  border: 0.063rem solid rgb(0, 0, 0);
  padding: 0;
`;

const ShowPasswordIcon = styled(IconButton)`
  margin-right: 10px;
`;

const InputTooltip = styled.div`
  margin: auto;
  cursor: pointer;
  margin-right: 10px;
  color: #5a7681;
  outline: none;
`;

const InputErrorMessage = styled.span`
  padding: 12px;
  color: #eb0000;
  font-size: 0.75em;
`;

const InputRequired = styled.span`
  color: #eb0000;
`;

const InputPrefix = styled(InputAdornment)`
  color: #eb0000;
`;

interface IconProps {
  imgSrc: string;
  color?: string;
  role?: string;
  backgroundColor?: string;
}

/**
 * Properies of Input component
 */
export interface InputProps {
  /**
   * @param autoFocus - MUI TextField autoFocus.
   */
  autoFocus?: TextFieldProps['autoFocus'];
  /**
   * @param autoComplete - MUI Textfield autoComplete.
   */
  autoComplete?: TextFieldProps['autoComplete'];
  /**
   * @param customStyles - Object for style overrides.
   */
  customStyles?: InputCustomStylesProps;
  /**
   * @param disabled - MUI Textfield disabled.
   */
  disabled?: TextFieldProps['disabled'];
  /**
   * @param error - flag for setting error stylings on.
   */
  error?: boolean;
  /**
   * @param errorMessage - message displayed on the bottom of component, to be used as form error messages.
   */
  errorMessage?: string;
  /**
   * @param icon - Image icon to be placed on left side of component.
   * @type IconProps
   */
  icon?: IconProps;
  /**
   * @param id - MUI Textfield id.
   */
  id?: TextFieldProps['id'];
  /**
   * @param inputRef - MUI Textfield inputRef.
   */
  inputRef?: TextFieldProps['inputRef'];
  /**
   * @param header - Input header label.
   */
  header?: string;
  /**
   * @param multiline - MUI TextField multiline.
   */
  multiline?: TextFieldProps['multiline'];
  /**
   * @param name - MUI TextField name
   */
  name?: TextFieldProps['name'];
  /**
   * @param onChange - MUI Textfield onChange
   */
  onChange?: TextFieldProps['onChange'];
  /**
   * @param onFocus - MUI Textfield onFocus
   */
  onFocus?: TextFieldProps['onFocus'];
  /**
   * @param onBlur - MUI Textfield onBlur
   */
  onBlur?: TextFieldProps['onBlur'];
  /**
   * @param onClick - MUI TextField onClick
   */
  onClick?: TextFieldProps['onClick'];
  /**
   * @param placeholder - MUI Textfield placeholder.
   */
  placeholder?: TextFieldProps['placeholder'];
  /**
   * @param prefix - Text shown at the end of Input (MUI endAdornment prop).
   */
  prefix?: string;
  /**
   * @param required - MUI Textfield required.
   */
  required?: boolean;
  /**
   * @param rightIcon - icon to be placed on right side of component with pointer: cursor and onClick event.
   * @type IconProps
   */
  rightIcon?: IconProps;
  /**
   * @param rightIconOnClick - function called on right icon click
   */
  rightIconOnClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /**
   * @param rows - MUI Textfield rows.
   */
  rows?: TextFieldProps['rows'];
  /**
   * @param tooltipMessage - Message to display in additional tooltip button at right side of Input.
   */
  tooltipMessage?: string;
  /**
   * @param type - MUI Textfield type.
   */
  type?: TextFieldProps['type'];
  /**
   * @param value - MUI Textfield value.
   */
  value?: string | number | readonly string[] | undefined;
  /**
   * @param inputMask - react-input-mask properties.
   */
  inputMask?: InputMaskOptions;
  /**
   * @param disableLeftBorderRadius - if true, left border radius will be set to 0
   */
  disableLeftBorderRadius?: boolean;
  /**
   * @param overrideMuiStyles - overrides material ui styles
   */
  overrideMuiStyles?: any;
  /**
   * @param currencyInput - options for CurrencyInput
   */
  currencyInput?: InputCurrencyOptions;
  /**
   * @param trimSpacesFromPastedValue - trimming pasted value
   */
  trimSpacesFromPastedValue?: boolean;
}

/**
 * Properties of customStyles object for styles overriding
 */
export interface InputCustomStylesProps {
  /**
   * @param headerStyles - additional styling for header.
   */
  headerStyles?: Record<string, unknown>;
  /**
   * @param inputColor - font color for input.
   */
  inputColor?: string;
  /**
   * @param borderOnFocus - border when input is focused. For example `1px solid blue`.
   */
  borderOnFocus?: string;
}

/**
 * Properties of inputMask object (https://github.com/sanniassin/react-input-mask#properties).
 */
export interface InputMaskOptions {
  /**
   * @param mask - Mask format
   */
  mask: string | Array<string | RegExp>;
  /**
   * @param maskChar - Placeholder to cover unfilled parts of the mask
   */
  maskChar?: string;
  /**
   * @param alwaysShowMask - Whether mask prefix and placeholder should be displayed when input is empty and has no focus.
   */
  alwaysShowMask?: boolean;
  /**
   * @param formatChars - Defines format characters with characters as keys and corresponding RegExp string as values. Default ones:
   ```
   {
    "9": "[0-9]",
    "a": "[A-Za-z]",
    "*": "[A-Za-z0-9]"
   }```
   */
  formatChars?: Record<string, string>;
  /**
   * @param permanents - an array of indexes of the non-editable characters in the mask
   */
  permanents?: number[];
  /**
   * @param beforeMaskedValueChange - function to specify new selection and new value of mask (check react-input-mask docs).
   */
  beforeMaskedValueChange?: (newState: InputState, oldState: InputState, userInput: string) => InputState;
}

/**
 * Properties of currency input object (https://github.com/cchanxzy/react-currency-input-field).
 */
export interface InputCurrencyOptions {
  /**
   * @param allowDecimals - Allow decimals
   */
  allowDecimals?: boolean;
  /**
   * @param allowNegativeValue - 	Allow user to enter negative value
   */
  allowNegativeValue?: boolean;
  /**
   * @param decimalsLimit - Limit length of decimals allowed
   */
  decimalsLimit?: number;
  /**
   * @param fixedDecimalLength - Value will always have the specified length of decimals
   */
  fixedDecimalLength?: number;
  /**
   * @param fixedDecimalLength - Max length of text
   */
  maxLength?: number;
  /**
   * @param prefix - Include a prefix eg. £ or $
   */
  prefix?: string;
  /**
   * @param suffix - Include a suffix eg. € or %
   */
  suffix?: string;
  /**
   * @param decimalSeparator - Separator between integer part and fractional part of value
   */
  decimalSeparator?: string;
  /**
   * @param groupSeparator - Separator between thousand, million and billion
   */
  groupSeparator?: string;
  /**
   * @param onValueChange - Programmatically set the value
   */
  onValueChange?: any;
  /**
   * @param intlConfig - International locale config
   */
  intlConfig?: any;
  /**
   * @param transformRawValue - Function Transform the raw value from the input before parsing. Needs to return string
   */
  transformRawValue?: any;
}

const StyledTextField = withStyles({
  root: {
    margin: 0,
  },
})(TextField);

const Input = ({
  icon,
  header,
  placeholder,
  error,
  customStyles: { inputColor = undefined, headerStyles = undefined, borderOnFocus = undefined } = {},
  inputMask,
  autoFocus,
  autoComplete,
  disabled,
  disableLeftBorderRadius,
  id,
  inputRef,
  errorMessage,
  multiline,
  name,
  onChange,
  onFocus,
  onBlur,
  onClick,
  required,
  rightIcon,
  rightIconOnClick,
  rows,
  type,
  tooltipMessage,
  value,
  prefix,
  currencyInput,
  trimSpacesFromPastedValue,
}: InputProps) => {
  const textAreaRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [containerClasses] = useState(() => {
    let container = InputMainContainer;
    if (icon) {
      container = withIcon;
    } else {
      container = noIcon;
    }
    if (disableLeftBorderRadius) {
      container = NoLeftBorderRadius;
    }
    return container;
  });

  const focusTextArea = (): void => {
    if (inputRef && typeof inputRef !== 'function' && (inputRef as any).current) {
      (inputRef as any).current.focus();
    } else if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const useStyles = makeStyles({
    underline: {
      '&&&:before': {
        borderBottom: 'none',
        content: 'none',
      },
      '&&:after': {
        borderBottom: 'none',
      },
    },
    input: {
      padding: '2px 4px 2px 0px',
      fontSize: '1em',
      fontWeight: 300,
      color: inputColor || '#474747',
      letterSpacing: '1px',
      minHeight: '28px',
    },
  });

  const classes = useStyles();

  return (
    <InputOuterContainer>
      <NoLeftBorderRadius
        style={{
          border: error ? '1px solid #eb0000' : isFocused ? borderOnFocus : '1px solid #eef2f2',
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      >
        {icon ? (
          <InputIcon onClick={focusTextArea} role="link">
            {icon && (
              <Image
                src={icon.imgSrc}
                alt="project"
                height="40"
                width="40"
                layout="responsive"
                className="rounded-md object-contain"
                color={
                  (error && `#eb0000`) ||
                  icon.color ||
                  '#5a7681'
                }
             />
            )}
          </InputIcon>
        ) : (
          <InputNoIcon />
        )}
        <InputRightContainer>
          <InputHeader
            style={error ? { ...headerStyles, color: 'red' } : headerStyles}
            onClick={focusTextArea}
            role="link"
          >
            <span className="inputHeaderText">
              {header}
              {required && <InputRequired>*</InputRequired>}
            </span>
          </InputHeader>
          <InputTextField>
            {inputMask ? (
              <InputMask
                onChange={(e: any) => {
                  if (e.nativeEvent.inputType === 'insertFromPaste') {
                    if (trimSpacesFromPastedValue) {
                      if (e) {
                        // eslint-disable-next-line no-param-reassign
                        e.target.value = e.target.value.replace(/ /g, '');
                      }
                    }
                  }
                  if (onChange) {
                    onChange(e);
                  }
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                value={value}
                beforeMaskedValueChange={inputMask.beforeMaskedValueChange}
                {...inputMask}
              >
                {() => (
                  <StyledTextField
                    placeholder={placeholder}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes,
                      endAdornment: prefix ? (
                        <InputPrefix position="end">{prefix}</InputPrefix>
                      ) : type === 'password' ? (
                        <InputAdornment position="end">
                          <ShowPasswordIcon
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => {
                              setShowPassword(!showPassword);
                            }}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </ShowPasswordIcon>
                        </InputAdornment>
                      ) : (
                        <span />
                      ),
                    }}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    id={id}
                    multiline={multiline}
                    name={name}
                    rows={rows}
                    variant="standard"
                    type={type === 'password' && showPassword ? 'text' : type}
                    inputRef={
                      inputRef && typeof inputRef === 'function'
                        ? ref => {
                            inputRef(ref);
                            textAreaRef.current = ref;
                          }
                        : inputRef || textAreaRef
                    }
                    onClick={onClick}
                  />
                )}
              </InputMask>
            ) : (
              <>
                {!currencyInput && (
                  <StyledTextField
                    placeholder={placeholder}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes,
                      endAdornment: prefix ? (
                        <InputAdornment className="input-prefix" position="end">
                          {prefix}
                        </InputAdornment>
                      ) : type === 'password' ? (
                        <InputAdornment position="end">
                          <IconButton
                            className="showPasswordIcon"
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => {
                              setShowPassword(!showPassword);
                            }}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ) : (
                        <span />
                      ),
                    }}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    id={id}
                    inputRef={
                      inputRef && typeof inputRef === 'function'
                        ? ref => {
                            inputRef(ref);
                            textAreaRef.current = ref;
                          }
                        : inputRef || textAreaRef
                    }
                    multiline={multiline}
                    name={name}
                    rows={rows}
                    variant="standard"
                    type={type === 'password' && showPassword ? 'text' : type}
                    value={value}
                    onChange={(e: any) => {
                      if (e.nativeEvent.inputType === 'insertFromPaste') {
                        if (trimSpacesFromPastedValue) {
                          if (e) {
                            // eslint-disable-next-line no-param-reassign
                            e.target.value = e.target.value.replace(/ /g, '');
                          }
                        }
                      }
                      if (onChange) {
                        onChange(e);
                      }
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={onClick}
                  />
                )}
                {currencyInput && (
                  <CurrencyInputStyle
                    id={id}
                    name={name}
                    allowDecimals={currencyInput.allowDecimals}
                    allowNegativeValue={currencyInput.allowNegativeValue}
                    ref={inputRef}
                    onValueChange={currencyInput.onValueChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={onClick}
                    intlConfig={currencyInput.intlConfig}
                    maxLength={currencyInput.maxLength}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    decimalsLimit={currencyInput.decimalsLimit}
                    fixedDecimalLength={currencyInput.fixedDecimalLength}
                    prefix={currencyInput.prefix}
                    suffix={currencyInput.suffix}
                    decimalSeparator={currencyInput.decimalSeparator}
                    groupSeparator={currencyInput.groupSeparator}
                    transformRawValue={currencyInput.transformRawValue}
                  />
                )}
              </>
            )}
          </InputTextField>
        </InputRightContainer>
        {rightIcon ? (
          <RightIcon
            onClick={rightIconOnClick}
            role={rightIcon.role ? rightIcon.role : 'link'}
            style={
              rightIcon.backgroundColor && {
                backgroundColor: rightIcon.backgroundColor,
              }
            }
          >
            <Image
              src={icon.imgSrc}
              alt="project"
              height="40"
              width="40"
              layout="responsive"
              className="rounded-md object-contain"
              color={
                (error && `#eb0000`) ||
                icon.color ||
                '#5a7681'
              }
             />
          </RightIcon>
        ) : (
          <div />
        )}
        {tooltipMessage && (
          <InputTooltip>
            <Tooltip title={tooltipMessage} />
          </InputTooltip>
        )}
      </NoLeftBorderRadius>
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </InputOuterContainer>
  );
};

export default Input;

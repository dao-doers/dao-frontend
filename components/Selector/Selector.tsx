/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, FocusEventHandler } from 'react';
import Select, { components, SingleValueProps, ValueType, ActionMeta, createFilter } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import Image from 'next/image';
import { Tooltip } from '@mui/material';
import styled from '@emotion/styled';

const LeftIconContainer = styled.div`
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

const RightContainer = styled.div`
  background-color: #fff;
  flex-grow: 3;
  box-sizing: border-box;
`;

const SelectorHeader = styled.div`
  background-color: #fff;
  flex-grow: 3;
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  display: flex;
  font-size: 1em;
  color: #474747;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.54;
`;

const BorderStyles = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  max-height: var(--selector-max-height);
`;

const DisableRightBorder = styled.div`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none !important;
`;

const SelectorRequired = styled.span`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none !important;
`;

const IndicatorsContainerStyle = styled.div`
  padding: 0;
`;

const SelectorPlaceholder = styled.div`
  padding: 0;
`;

const OptionIconContainer = styled.span`
  padding-right: 12px;
`;

const NoIconStyles = styled.div`
  padding-right: 12px;
`;

const SelectorErrorMessage = styled.span`
  padding-right: 12px;
`;

const SelectorTooltip = styled.span`
  cursor: pointer;
  margin: auto 10px auto auto;
  color: #5a7681;
  outline: none;
`;

const SelectorOptionContainer = styled.span`
  display: flex;
  align-items: center;
`;

const SelectorOptionWindowed = styled.span`
  height: 24px;
`;
export type selectorOptionType = {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: string;
  network?: string;
  icon?: JSX.Element;
};

type OnChange = (value: ValueType<selectorOptionType, boolean>, actionMeta: ActionMeta<selectorOptionType>) => void;

interface IconProps {
  imgSrc: string;
  color?: string;
  role?: string;
  backgroundColor?: string;
}

/**
 * Selector props
 */
export interface SelectorProps {
  /**
   * @param allowIconReplacing - If true, after each option select, Selector's icon will be replaced with SelectorOption's icon.
   */
  allowIconReplacing?: boolean | false;
  /**
   * @param children - Selector options. If grouped it's Group objects array, otherwise it's Option objects array.
   */
  children: Array<React.ReactElement>;
  /**
   * @param customStyles - Object for style overrides.
   */
  customStyles?: SelectorCustomStyles;
  /**
   * @param overrideValue - selector's override value
   */
  overrideValue?: selectorOptionType | undefined;
  /**
   * @param defaultValue - selector's default value
   */
  defaultValue?: selectorOptionType | undefined;
  /**
   * @param disabled - If true, selector will be disabled.
   */
  disabled?: boolean;
  /**
   * @param disableRightBorder - When true, right border will be disabled and top-right, bottom-right radius will be set to 0.
   */
  disableRightBorder?: boolean;
  /**
   * @param displayLabelOnSelect - If true, selected option will be displayed as it is in `SelectorOption`.
   */
  displayLabelOnSelect?: boolean;
  /**
   * @param displayOptionIcon- If true, SelectorOption's icon will be displayed at Option's left side.
   */
  displayOptionIcon?: any;
  /**
   * @param error - flag for setting error stylings on.
   */
  error?: boolean;
  /**
   * @param errorMessage - message displayed on the bottom of component, to be used as form error messages.
   */
  errorMessage?: string;
  /**
   * @param grouped - If true, option grouping is enabled.
   */
  grouped?: boolean;
  /**
   * @param header - Header placed at the top of selector, string or ReactElement
   */
  header?: string | React.ReactElement;
  /**
   * @param icon - Icon or ReactElement shown at selector's left side.
   */
  icon?: IconProps;
  /**
   * @param allowMultiselect - If true, multiselect option is available.
   */
  allowMultiselect?: boolean;
  /**
   * @param ref - Referency to Select component.
   */
  inputRef?: React.Ref<any>;
  /**
   * @param isClearable - is true, selector value will be clearable.
   */
  isClearable?: boolean;
  /**
   * @param isMenuOpen - Flag for manually setting menu open.
   */
  isMenuOpen?: boolean;
  /**
   * @param isWindowed - Flag for enabling via react-window (recommended for large lists)
   */
  isWindowed?: boolean;
  /**
   * @param menuPlacement - default 'bottom', 'auto' changes it to top if there is no space below.
   */
  menuPlacement?: 'auto' | 'top' | 'bottom';

  /**
   * @param menuPortalTarget - Target HTML element for portal parent.
   */
  menuPortalTarget?: HTMLElement | null;
  /**
   * @param name - Name passed to react-select object
   */
  name?: string;
  /**
   * @param onBlur - Function to run on Selector blur.
   */
  onBlur?: FocusEventHandler;
  /**
   * @param onChange - Function to run on Selector change.
   */
  onChange?: OnChange;
  /**
   * @param onFocus - Function to run on Selector focus.
   */
  onFocus?: FocusEventHandler;
  /**
   * @param placeholder - Selector placeholder, string or ReactElement.
   */
  placeholder: string | React.ReactElement;
  /**
   * @param required - If true, selector will be marked as required.
   */
  required?: boolean;
  /**
   * @param tooltipMessage - Message to display in additional tooltip button at right side of Selector.
   */
  tooltipMessage?: string;
  /**
   * @param showDropdownIcon - If true, dropdown icon will be shown.
   */
  showDropdownIcon?: boolean;
  /**
   * @param overrideMuiStyles - overrides material ui styles
   */
  overrideMuiStyles?: any;
}

/**
 * Properties of CustomIconStyles object for overriding
 */
export interface SelectorCustomStyles {
  /**
   * @param placeholderStyles - additional styles for placeholder.
   */
  placeholderStyles?: Record<string, unknown>;
  /**
   * @param headerStyles - additional styles for header.
   */
  headerStyles?: Record<string, unknown>;
  /**
   * @param selectedValueStyles - additional styles for selected option.
   */
  selectedValueStyles?: Record<string, unknown>;
  /**
   * @param selectorFocusedBorder - onFocus style for border (ex. '1px solid blue').
   */
  selectorFocusedBorder?: string;
}

// Overriding react-select styling
const IndicatorsContainer = (props: any): React.ReactElement => {
  return (
    <IndicatorsContainerStyle>
      <components.IndicatorsContainer {...props} />
    </IndicatorsContainerStyle>
  );
};

// Overriding react-select styling, when option is chosen, show only option label instead of whole ReactElement.
const Selector = ({
  children,
  grouped,
  placeholder,
  disabled,
  disableRightBorder,
  error,
  errorMessage,
  icon,
  inputRef,
  header,
  onFocus,
  menuPlacement,
  onBlur,
  onChange,
  name,
  overrideValue,
  defaultValue,
  allowMultiselect,
  menuPortalTarget,
  customStyles: {
    selectedValueStyles = undefined,
    headerStyles = undefined,
    placeholderStyles = undefined,
    selectorFocusedBorder = undefined,
  } = {},
  displayLabelOnSelect,
  allowIconReplacing,
  displayOptionIcon,
  isMenuOpen,
  isWindowed,
  isClearable,
  required,
  tooltipMessage,
  showDropdownIcon,
}: SelectorProps) => {
  const refObj = useRef<HTMLElement>(null);
  const [selectedIcon, setSelectedIcon] = useState(() => {
    if (icon) {
      return (
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
      );
    }
    return undefined;
  });
  const [selectLabels] = useState(() => {
    let selectOptions: any[] = [];
    let selectOption;
    if (!grouped) {
      React.Children.forEach(children, child => {
        selectOption = {
          value: child.props.value,
          label: (
            <span
              className={
                isWindowed ? 'selector-option-windowed selector-option-container' : 'selector-option-container'
              }
            >
              {displayOptionIcon && (
                <OptionIconContainer style={{ width: '10%' }}>{child.props.icon}</OptionIconContainer>
              )}
              {child.props.children}
            </span>
          ),
          selected: child.props.selected || child.props.label,
          disabled: child.props.disabled,
          icon: child.props.icon || undefined,
          paymentNetwork: child.props.paymentNetwork,
        };
        selectOptions.push(selectOption);
      });
      return selectOptions;
    }
    const groupedArr: any[] = [];
    let groupedElement;
    React.Children.forEach(children, child => {
      React.Children.forEach(child.props.children, option => {
        selectOption = {
          value: option.props.value,
          label: (
            <span>
              {displayOptionIcon && option.props.icon}
              {option.props.children}
            </span>
          ),
          disabled: option.props.disabled,
          selected: option.props.selected || option.props.label,
          icon: child.props.icon || undefined,
        };
        selectOptions.push(selectOption);
      });
      groupedElement = {
        label: child.props.label,
        options: selectOptions,
      };
      selectOptions = [];
      groupedArr.push(groupedElement);
    });
    return groupedArr;
  });

  /* Track first render of component */
  const firstUpdate = useRef(true);

  useEffect(() => {
    // Don't run this code at initial render - this was causing icon update rerendering
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else if (icon) {
      setPreviousIcon(selectedIcon?.props.name);
      setSelectedIcon(
        <Image
          src={icon.imgSrc}
          alt="project"
          height="40"
          width="40"
          layout="responsive"
          className="rounded-md object-contain"
          color={(error && '#eb0000') || icon.color || '#5a7681'}
        />,
      );
    }
  }, [error]);

  /* Track previous icon */
  const [previousIcon, setPreviousIcon] = useState(undefined);

  // Track first render of component for setting focus /;
  const firstUpdateSetFocus = useRef<boolean>(true);

  // Don't set focus by default when defaultValue is provided /;
  const dontSetFocusAfterUpdate = useRef<boolean>(false);

  useEffect(() => {
    if (allowIconReplacing && selectedIcon && previousIcon !== undefined) {
      if (defaultValue && firstUpdateSetFocus.current) {
        firstUpdateSetFocus.current = false;
        dontSetFocusAfterUpdate.current = true;
      } else if (!defaultValue || (defaultValue && !dontSetFocusAfterUpdate.current)) {
        if (inputRef) {
          (inputRef as any).current.focus();
        } else {
          refObj.current?.focus();
        }
      } else if (defaultValue && dontSetFocusAfterUpdate.current) {
        dontSetFocusAfterUpdate.current = false;
      }
    }
  }, [selectedIcon?.props?.name, dontSetFocusAfterUpdate.current]);

  const style = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
      minHeight: '36px',
      paddingBottom: '4px',
      backgroundColor: state.isDisabled ? 'white' : 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      fontSize: '1em',
      color: '#474747',
      letterSpacing: '1px',
      padding: 0,
      fontWeight: 300,
      margin: 0,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0.313rem 1.25rem',
    }),
    indicatorsContainer: (provided: any) => {
      return {
        ...provided,
        padding: 0,
        paddingRight: showDropdownIcon || isClearable ? '10px' : 0,
      };
    },
    option: (provided: any, state: any) => {
      return {
        ...provided,
        color: state.isDisabled ? '#cdd5d5' : state.isSelected ? '#fff' : '#14171a',
        cursor: state.isDisabled ? 'not-allowed' : 'default',
        backgroundColor: state.isSelected ? '#0f75db' : state.isFocused ? '#cddef9' : 'null',
      };
    },
    menuPortal: (provided: any) => {
      if (menuPortalTarget) {
        return {
          ...provided,
          position: 'relative',
          top: 0,
          width: '100%',
          left: 0,
        };
      }
      return {
        ...provided,
      };
    },
    menuList: base => ({
      ...base,
      '::-webkit-scrollbar': {
        width: '9px',
      },
      '::-webkit-scrollbar-track': {
        background: '#cdd5d5',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#5a7681',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
  };

  // Only one option can be selected.
  const SingleValue: React.FC<SingleValueProps<any>> = (singleValueprops: any) => {
    let singleValueStyles = {};
    if (selectedValueStyles) {
      singleValueStyles = selectedValueStyles;
    }

    /* Lift selected option's icon state up */
    useEffect(() => {
      if (
        singleValueprops?.data?.icon?.props?.name &&
        allowIconReplacing &&
        selectedIcon?.props.name !== singleValueprops?.data?.icon?.props?.name &&
        singleValueprops?.data?.icon?.props?.name !== 'globe'
      ) {
        setPreviousIcon(selectedIcon?.props.name);
        setSelectedIcon(singleValueprops.data.icon);
      }
    }, [singleValueprops?.data?.icon?.props?.name]);

    if (displayLabelOnSelect) {
      return (
        <components.SingleValue {...singleValueprops}>
          <span style={singleValueStyles}>{singleValueprops.data.label}</span>
        </components.SingleValue>
      );
    }
    return (
      <components.SingleValue {...singleValueprops}>
        <span style={singleValueStyles}>{singleValueprops.data.selected}</span>
      </components.SingleValue>
    );
  };

  // Overriding react-select styles, show header at top of selector and icon at left of it.
  const ControlComponent = (controlProps: any): any => {
    let containerStyle: Record<string, unknown>;
    let focusedBorder;
    const iconProps = selectedIcon?.props;
    let borderOverride = false;
    let headerStyle = {};
    if (headerStyles) {
      headerStyle = headerStyles;
    }
    if (controlProps.isDisabled) {
      headerStyle = Object.assign(headerStyle, {
        color: '#cdd5d5',
      });
    }
    if (selectorFocusedBorder) {
      focusedBorder = selectorFocusedBorder;
      borderOverride = true;
    }
    if (error) {
      containerStyle = {
        border: 'solid 1px #eb0000',
      };
    } else if (controlProps.isFocused) {
      containerStyle = {
        border: borderOverride ? focusedBorder : 'solid 1px #cdd5d5',
      };
    } else {
      containerStyle = {
        border: 'solid 1px #cdd5d5',
      };
    }
    return (
      <div className={disableRightBorder ? 'border-styles disableRightBorder' : 'border-styles'} style={containerStyle}>
        {icon ? (
          <LeftIconContainer>
            {controlProps.isDisabled ? (
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
            ) : (
              selectedIcon
            )}
          </LeftIconContainer>
        ) : (
          <NoIconStyles />
        )}
        <RightContainer>
          <SelectorHeader>
            <span style={error ? { ...headerStyle, color: '#eb0000' } : headerStyle}>
              {header}
              {required && <SelectorRequired>*</SelectorRequired>}
            </span>
          </SelectorHeader>
          <components.Control {...controlProps} />
        </RightContainer>
        {tooltipMessage && (
          <SelectorTooltip>
            <Tooltip title={tooltipMessage} />
          </SelectorTooltip>
        )}
      </div>
    );
  };

  const WindowedMenuListItem = ({ data, index, style: itemStyle }): JSX.Element => {
    const item = data[index];
    return <div style={itemStyle}>{item}</div>;
  };

  // MenuList component using react-window for windowing
  const WindowedMenuList = (props): any => {
    const { options, children: menuChildren, maxHeight, getValue } = props;
    const optionsLenght = Object.keys(menuChildren).length;
    const [value] = getValue();
    const height = 40;
    const initialOffset = options.indexOf(value) * height;
    const list = useRef<List>(null);

    // Keypress handling logic taken from https://github.com/jacobworrel/react-windowed-select
    function isItemFocused({ props: { isFocused } }): boolean {
      return isFocused === true;
    }

    function getCurrentIndex(childrenItem): number {
      if (Array.isArray(childrenItem)) {
        return Math.max(childrenItem.findIndex(isItemFocused), 0);
      }
      return 0;
    }

    const currentIndex = React.useMemo(() => getCurrentIndex(menuChildren), [menuChildren]);

    React.useEffect(() => {
      if (currentIndex >= 0 && list.current !== null) {
        list.current.scrollToItem(currentIndex);
      }
    }, [currentIndex, children, list]);

    // If List isn't empy, use windowing
    if (menuChildren[0]) {
      return (
        <List
          height={maxHeight > optionsLenght * height ? optionsLenght * height : maxHeight}
          ref={list}
          itemCount={Object.keys(menuChildren).length}
          itemSize={height}
          itemData={menuChildren}
          width="100%"
          initialScrollOffset={initialOffset}
        >
          {WindowedMenuListItem}
        </List>
      );
    }

    // For empty lists use default React-select view
    return <components.MenuList {...props} />;
  };

  // Overriding placeholder styles
  const selectorPlaceholder = (): React.ReactElement => {
    let placeholderStyle = {};
    if (placeholderStyles) {
      placeholderStyle = placeholderStyles;
    }
    if (disabled) {
      placeholderStyle = Object.assign(placeholderStyle, {
        color: '#cdd5d5',
      });
    }
    return (
      <Placeholder>
        <span style={placeholderStyle}>{placeholder}</span>
      </Placeholder>
    );
  };

  return (
    <div className="selector-outer-container">
      <Select
        placeholder={selectorPlaceholder()}
        options={selectLabels}
        isDisabled={disabled}
        styles={style}
        isClearable={isClearable}
        components={{
          SingleValue,
          Control: ControlComponent,
          MenuList: isWindowed ? WindowedMenuList : components.MenuList,
          DropdownIndicator: showDropdownIcon ? components.DropdownIndicator : () => null,
          IndicatorSeparator: () => null,
          IndicatorsContainer,
        }}
        value={overrideValue}
        defaultValue={defaultValue}
        isSearchable
        isMulti={allowMultiselect}
        filterOption={createFilter({ ignoreAccents: false })}
        getOptionLabel={option => {
          return option.label;
        }}
        onFocus={event => {
          if (onFocus) onFocus(event);
        }}
        onChange={(event, action) => {
          if (onChange) {
            onChange(event, action);
          }
        }}
        onBlur={event => {
          if (onBlur) onBlur(event);
        }}
        name={name}
        ref={inputRef || refObj}
        isOptionDisabled={option => option.disabled === true}
        menuPortalTarget={menuPortalTarget}
        menuIsOpen={isMenuOpen}
        menuPlacement={menuPlacement}
      />
      {errorMessage && <SelectorErrorMessage>{errorMessage}</SelectorErrorMessage>}
    </div>
  );
};

export default Selector;

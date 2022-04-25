/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import MUIStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector from '@mui/material/StepConnector';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import AdjustIcon from '@mui/icons-material/Adjust';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export interface StepperProps {
  children: Array<React.ReactElement>;
  onComplete?: () => any;
  nonLinear?: boolean;
  interactive?: boolean;
  icons?: StepIconsProps;
  vertical?: boolean;
  activeStep?: number;
  completedSteps?: Array<number>;
  onStepChange?: (activeStep?: number, previousStep?: number) => any;
  onStepComplete?: (completedStep?: number) => any;
}

interface StepIconsProps {
  defaultIcon?: JSX.Element;
  activeIcon?: JSX.Element;
  completeIcon?: JSX.Element;
}

// Styles for StepConnector when 'nonLinear' is not enabled.
const StaticStepConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 14px)',
    right: 'calc(50% + 14px)',
  },
  active: {
    '& $line': {
      borderColor: '#212030',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#212030',
    },
  },
  line: {
    borderColor: '#212030',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

// Styles for StepConnector when 'nonLinear' is enabled.
const CustomStepConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 14px)',
    right: 'calc(50% + 14px)',
  },
  active: {
    '& $line': {
      borderColor: '#212030',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#00D395',
    },
  },
  line: {
    borderColor: '#212030',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

// Styles for StepLabel.
const CustomStepLabel = withStyles({
  completed: {
    color: '#212030 !important',
  },
  active: {
    color: '#212030 !important',
  },
  label: {
    color: '#212030',
  },
  root: {
    width: 'auto !important',
  },
})(StepLabel);

// Styles for Step.
const CustomStep = withStyles({
  alternativeLabel: {
    minWidth: '0',
  },
})(Step);

// Styles for StepButton.
const CustomStepButton = withStyles({
  root: {
    minWidth: '0',
    flex: 1,
    position: 'relative',
    display: 'block !important',
  },
  vertical: {
    textAlign: 'left',
  },
})(StepButton);

// Styles for StepIcons.
const iconStyles = makeStyles({
  root: {
    color: '#00D395',
    display: 'flex',
    alignItems: 'center',
    height: 24,
  },
});

const { forwardRef, useImperativeHandle } = React;

const Stepper = forwardRef<any, StepperProps>(
  (
    {
      nonLinear,
      interactive,
      vertical,
      children,
      onComplete,
      icons,
      activeStep,
      completedSteps,
      onStepChange,
      onStepComplete,
    }: StepperProps,
    ref,
  ): JSX.Element => {
    // Array of labels names.
    const [stepLabels] = useState(() => {
      const labelsArray: any[] = [];
      React.Children.forEach(children, child => {
        labelsArray.push(child.props.label);
      });
      return labelsArray;
    });

    const [optionalSteps] = useState(() => {
      const optionalsArray: Array<number> = new Array(stepLabels.length).fill(0);
      if (!nonLinear) {
        return optionalsArray;
      }
      let counter = 0;
      React.Children.forEach(children, child => {
        if (child.props.optional) {
          optionalsArray[counter] = 1;
        }
        counter += 1;
      });
      return optionalsArray;
    });

    const [activeStepState, setActiveStep] = useState(0);

    const [previousStep, setPreviousStep] = useState(0);

    const initializeSteps = (): Array<number> => {
      return new Array(stepLabels.length).fill(0);
    };

    // Array state of completed steps.
    const [completedStepsState, setCompletedSteps] = useState(initializeSteps());

    /* Array of Icons for each step.
      Firstly, all are set to default values or icons from props.
      Next, during iteration through Steps, values are overriden if icon is found in Step Props
    */
    const [iconsObject] = useState((): {
      default: Array<React.ReactElement>;
      active: Array<React.ReactElement>;
      complete: Array<React.ReactElement>;
    } => {
      const defaultIcons: Array<React.ReactElement> = [];
      const activeIcons: Array<React.ReactElement> = [];
      const completeIcons: Array<React.ReactElement> = [];
      for (let i = 1; i <= stepLabels.length; i += 1) {
        if (icons && icons.defaultIcon) {
          defaultIcons[i] = <CircleOutlinedIcon />;
        } else {
          defaultIcons[i] = <CircleOutlinedIcon />;
        }
        if (icons && icons.activeIcon) {
          activeIcons[i] = <AdjustIcon />;
        } else {
          activeIcons[i] = <AdjustIcon />;
        }
        if (icons && icons.completeIcon) {
          completeIcons[i] = <CheckCircleOutlineIcon />;
        } else {
          completeIcons[i] = <CheckCircleOutlineIcon />;
        }
      }
      let counter = 1;
      React.Children.forEach(children, child => {
        if (child.props.defaultIcon) {
          defaultIcons[counter] = <CircleOutlinedIcon />;
        }
        if (child.props.activeIcon) {
          activeIcons[counter] = <CircleOutlinedIcon />;
        }
        if (child.props.completeIcon) {
          completeIcons[counter] = <DoneAllIcon />;
        }
        if (child.props.placeholder) {
          defaultIcons[counter] = <DAOCircleLoader size={20} />;
          activeIcons[counter] = <DAOCircleLoader size={20} />;
          completeIcons[counter] = <DAOCircleLoader size={20} />;
        }
        counter += 1;
      });
      const iconsArray = {
        default: defaultIcons,
        active: activeIcons,
        complete: completeIcons,
      };
      return iconsArray;
    });

    const handleStepChange = (newActiveStep: number): void => {
      if (onStepChange) {
        onStepChange(newActiveStep, previousStep);
      }
      setPreviousStep(newActiveStep);
    };

    const allStepsCompleted = (steps: Array<number>): boolean => {
      for (let i = 0; i < steps.length; i += 1) {
        if (steps[i] === 0 && optionalSteps[i] === 0) {
          return false;
        }
      }
      return true;
    };

    useEffect(() => {
      if (activeStep !== undefined && activeStep !== activeStepState) {
        handleStepChange(activeStep);
        setActiveStep(activeStep);
      }
    }, [activeStep]);

    useEffect(() => {
      if (completedSteps !== undefined) {
        if (onStepComplete && JSON.stringify(completedSteps) !== JSON.stringify([0, 0, 0])) {
          onStepComplete(activeStepState);
        }
        setCompletedSteps(completedSteps);
        if (allStepsCompleted(completedSteps) && onComplete) {
          onComplete();
        }
      }
    }, [JSON.stringify(completedSteps)]);

    function isStepComplete(step: number): boolean {
      if (completedStepsState[step] === 1) {
        return true;
      }
      return false;
    }

    const handleStep = (index: number): void => {
      if (index !== activeStepState) {
        handleStepChange(index);
        setActiveStep(index);
      }
    };

    const totalSteps = (): number => {
      return stepLabels.length;
    };

    const isLastStep = (): boolean => {
      return activeStepState === totalSteps() - 1;
    };

    const isFirstStep = (): boolean => {
      return activeStepState === 0;
    };

    const handleNext = (): undefined => {
      if (!isLastStep() && !isStepComplete(activeStepState + 1)) {
        handleStepChange(activeStepState + 1);
        setActiveStep(activeStepState + 1);
      } else {
        let idx = activeStepState;
        for (let i = 1; i <= stepLabels.length; i += 1) {
          if (idx + 1 === stepLabels.length) {
            idx = 0;
          } else {
            idx += 1;
          }
          if (!isStepComplete(idx)) {
            handleStepChange(idx);
            setActiveStep(idx);
            return;
          }
        }
      }
    };

    // Methods to be shared with parent via useRef and useImperativeHandle.
    useImperativeHandle(ref, () => ({
      // Go to the next step without completing current (works only when nonLinear is set).
      nextStep() {
        if (nonLinear) {
          handleNext();
        }
      },

      handleStep(idx: number) {
        handleStep(idx);
      },

      completeStep() {
        const newCompleted = completedStepsState;
        newCompleted[activeStepState] = 1;
        if (onStepComplete) {
          onStepComplete(activeStepState);
        }
        setCompletedSteps(newCompleted);
        if (allStepsCompleted(completedStepsState)) {
          if (onComplete) {
            onComplete();
          }
        } else {
          handleNext();
        }
      },

      previousStep() {
        if (!isFirstStep() && nonLinear) {
          handleStepChange(activeStepState - 1);
          setActiveStep(activeStepState - 1);
        }
      },

      resetSteps() {
        setActiveStep(0);
        setPreviousStep(0);
        setCompletedSteps(initializeSteps());
      },
    }));

    // Return proper icon based on step state (completed, active or default).
    // eslint-disable-next-line react/no-unstable-nested-components
    const CustomIcons = (iconProps: StepIconProps): JSX.Element => {
      const classes = iconStyles();
      const { active, completed } = iconProps;

      return (
        <div className={classes.root}>
          {completed ? (
            // eslint-disable-next-line react/destructuring-assignment
            <div>{iconsObject.complete[Number(iconProps.icon)]}</div>
          ) : (
            <div>
              {active ? (
                // eslint-disable-next-line react/destructuring-assignment
                <div>{iconsObject.active[Number(iconProps.icon)]}</div>
              ) : (
                // eslint-disable-next-line react/destructuring-assignment
                <div>{iconsObject.default[Number(iconProps.icon)]}</div>
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="main-container">
        <MUIStepper
          activeStep={activeStepState}
          alternativeLabel={!vertical}
          nonLinear={!vertical}
          connector={!nonLinear ? <CustomStepConnector /> : <StaticStepConnector />}
          orientation={vertical ? 'vertical' : 'horizontal'}
          style={{
            minWidth: '50px',
            backgroundColor: 'transparent',
            paddingBottom: 'var(--padding-md)',
          }}
        >
          {stepLabels.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const stepLabelProps: {
              completed?: boolean;
              optional?: React.ReactElement;
            } = {};
            if (isStepComplete(index)) {
              stepProps.completed = true;
              stepLabelProps.completed = true;
            }
            if (optionalSteps[index] === 1) {
              if (index === activeStepState) {
                stepLabelProps.optional = <div className={`optional-label ${!vertical && 'centered'}`}>Optional</div>;
              } else {
                stepLabelProps.optional = (
                  <div className={`optional-label not-active ${!vertical && 'centered'}`}>Optional</div>
                );
              }
            }
            return (
              <CustomStep key={index} {...stepProps}>
                {interactive ? (
                  <CustomStepButton
                    disabled={
                      !nonLinear &&
                      !(completedStepsState[index] === 1) &&
                      !(index === activeStepState) &&
                      completedStepsState[index - 1] === 0
                    }
                    optional={stepLabelProps.optional}
                    onClick={() => {
                      handleStep(index);
                    }}
                  >
                    <CustomStepLabel StepIconComponent={e => CustomIcons(e)}>
                      {label}
                      {/* Tooltip text={label} value={label} /> */}
                    </CustomStepLabel>
                  </CustomStepButton>
                ) : (
                  <CustomStepLabel optional={stepLabelProps.optional} StepIconComponent={e => CustomIcons(e)}>
                    {label}
                    {/* <Tooltip text={label} value={label} /> */}
                  </CustomStepLabel>
                )}
                {vertical && <StepContent>{children[activeStepState]}</StepContent>}
              </CustomStep>
            );
          })}
        </MUIStepper>
        {!vertical && children[activeStepState]}
      </div>
    );
  },
);

export default Stepper;

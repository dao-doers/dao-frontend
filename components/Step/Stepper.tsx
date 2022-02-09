import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Step, Typography } from '@mui/material';
import Modal from 'components/Modal/Modal';
import { StepContent } from 'material-ui';


const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 325,
    minWidth: 325,
  },
  card: {
    margin: 'auto',
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  }));

 


export default function Stepper(props) {
  const [open, setOpen] = useState(true)
  const [finished, setFinished] = useState(true)
  const [applicant, setApplicant] = useState(props.accountId)
  const [funding, setFunding] = useState('')
  const [proposalIdentifier, setProposalIdentifier] = useState('')
  const [tributeOffer, setTributeOffer] = useState('')
  const [tributeType, setTributeType] = useState('')

  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0);

  function getSteps() {
    
    return ['Funding Information', 'Tribute Information', 'Review Proposal'];
  } 
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };
  
  const handleApplicantChange = (event) => {
    setApplicant(event.target.value);
  };

  const handleFundingChange = (event) => {
    setFunding(event.target.value);
  };

  const handleTributeOfferChange = (event) => {
    setTributeOffer(event.target.value);
  };

  const handleTributeTypeChange = (event) => {
    setTributeType(event.target.value);
    console.log(tributeType)
  };

function getStepContent(step) {
  switch (step) {
    case 0:
      
      return (
        <div>
    
      </div>
      )
      case 1:
        return (
          
          <div>
            
        </div>
        )
    case 2:
      return (
       
          <Card className={classes.card}>
            <CardHeader title="id"/>
       
          </Card>
       
      )
    default:
      return 'Unknown step';
  }
}



  return (
    <div>
     
     <Modal isOpen={open} handleClose={handleClose}>
        <div>
        {!finished ? <LinearProgress className={classes.progress} /> : (
        //   <DialogContentText>
        //     Complete the steps to.  
        //   </DialogContentText>
          <div className={classes.root}>  
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                {getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        disabled = {
                         
                          (activeStep ===0) ||
                          (activeStep ===1) }
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                     
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
       
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps complete - submit your proposal.</Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
              <Button type="submit" className={classes.button}>
                Submit Proposal
              </Button>
            </Paper>
          
          )}
        </div>
        )}
         
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Modal>
    </div>
  );
}

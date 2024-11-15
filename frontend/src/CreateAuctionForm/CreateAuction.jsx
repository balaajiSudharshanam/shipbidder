import React, { useState } from 'react';
import CreateLocation from './CreateLocation';
import CreateItem from './CreateItem';
import AuctionForm from './AuctionForm';
import { Button, Grid, Snackbar, Alert, Stepper, StepLabel, Step } from '@mui/material';
import { useMultiStepForm } from '../../CustomHooks/useMultiStepForm';
import { useFormState } from '../context/FormContextProvide';

const CreateAuction = ({ handleModal }) => {
  const steps = [
    <CreateLocation />,
    <CreateItem />,
    <AuctionForm />
  ];
  const labels=["Location", "Item Details", "Auction Details"]
  const { currentStep, step, back, next } = useMultiStepForm(steps);
  const { creatauction, Errors, setErrors } = useFormState();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCreateAuction = async () => {
    
    try {
      await creatauction();
      handleModal();
      setOpenSnackbar(true); 
    } catch (error) {
      console.error("Error creating auction:", error);
    }
  };

  return (
    <div>
      <Stepper activeStep={currentStep} alternativeLabel>
        {labels.map((label,index)=>(
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {step}
      <Grid container justifyContent="space-between" mt={2}>
        {currentStep > 0 && <Button onClick={back}>Back</Button>}
        {currentStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleCreateAuction}>
            Create
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={next}>
            Next
          </Button>
        )}
      </Grid>

      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Auction created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateAuction;

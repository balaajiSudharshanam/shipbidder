import React from 'react'
import CreateLocation from './CreateLocation'
import CreateItem from './CreateItem'
import AuctionForm from './AuctionForm';
import { Button, Grid, Grid2 } from '@mui/material';
import { useMultiStepForm } from '../../CustomHooks/useMultiStepForm';
import { useFormState } from '../context/FormContextProvide';
import axios from 'axios';

const CreateAuction = () => {
  const steps=[
    <CreateLocation />,
    <CreateItem />,
    <AuctionForm />
];
  const { currentStep, step, back, next } = useMultiStepForm(steps);
  const{creatauction, locationFormData}=useFormState();
  



  return (
    <div>
     {/* <CreateLocation/> */}
     {step}
     <Grid2>
      {currentStep===0?<></>:<Button onClick={back}>back</Button>}
      {currentStep===steps.length-1?<Button onClick={creatauction}>Create</Button>:<Button onClick={next}>next</Button>}
      
      
     </Grid2>
    </div>
  )
}

export default CreateAuction

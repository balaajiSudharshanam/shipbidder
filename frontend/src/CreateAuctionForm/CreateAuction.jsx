import React from 'react'
import CreateLocation from './CreateLocation'
import CreateItem from './CreateItem'
import AuctionForm from './AuctionForm';
import { Button, Grid, Grid2 } from '@mui/material';
import { useMultiStepForm } from '../../CustomHooks/useMultiStepForm';

const CreateAuction = () => {
  const { currentStep, step, back, next } = useMultiStepForm([
    <CreateLocation />,
    <CreateItem />,
    <AuctionForm />
]);

 
  return (
    <div>
     {/* <CreateLocation/> */}
     {step}
     <Grid2>
      <Button onClick={back}>back</Button>
      <Button onClick={next}>next</Button>
     </Grid2>
    </div>
  )
}

export default CreateAuction

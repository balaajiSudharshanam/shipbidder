import React from 'react'
import CreateLocation from './CreateLocation'
import CreateItem from './CreateItem'
import AuctionForm from './AuctionForm';

const CreateAuction = () => {
  const { currentStep, step, back, next } = useMultiStepForm([
    <CreateLocation />,
    <CreateItem />,
    <AuctionForm />
]);

 
  return (
    <div>
     {/* <CreateLocation/> */}
     <CreateItem/>
    </div>
  )
}

export default CreateAuction

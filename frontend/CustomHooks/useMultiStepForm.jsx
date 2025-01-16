import { useEffect, useState } from "react";
import { useFormState } from "../src/context/FormContextProvide";

export function useMultiStepForm(steps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [valid, setValid] = useState(true);
    
    const {locationFormData,Errors,setErrors,itemFormData,}= useFormState();

    function next() {
        // console.log('next triggered');
        const newErrors = {};
        if (currentStep === 0) {
            const requiredFields = [
                'pickupAddress',
                'pickupCity',
                'pickupState',
                'pickupPostalCode',
                'dropAddress',
                'dropState',
                'dropPostalCode',
                'dropCity'
            ];
            requiredFields.forEach((field) => {
                if (!locationFormData[field]) {
                    newErrors[field] = 'This field is required';
                    // setValid(false);
                }
            });

            
        }else if(currentStep==1){
            const requiredFields = [
                'height',
                'length',
                'width',
                'weight',
                'category',
                'subCategory',
                
            ];
            requiredFields.forEach((field)=>{
                if(!itemFormData[field]){
                    newErrors[field]='This field is required'
                }
            });
            
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); 
            return;
        }
      
            setCurrentStep(i => {
                if (i >= steps.length - 1) return i;
                return i + 1;
            });
        
    }
    useEffect(()=>{
        console.log(Errors);
    },[Errors])

    function back() {
        setCurrentStep(i => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goto(i) {
        if (i >= 0 && i < steps.length) {
            setCurrentStep(i);
        }
    }

    return {
        currentStep,
        step: steps[currentStep],
        setCurrentStep,
        next,
        back,
        goto,
        
    };
}

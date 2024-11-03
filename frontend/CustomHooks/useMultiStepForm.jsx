import { useState } from "react";

export function useMultiStepForm({ steps }) {
    const [currentStep, setCurrentStep] = useState(0);

    function next() {
        setCurrentStep(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

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
        goto
    };
}

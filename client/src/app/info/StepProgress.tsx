import React from 'react';
import { cn } from 'src/utils';

interface StepData {
  title: string;
  description: string;
}

interface StepProgressProps {
  steps: StepData[];
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  const progress = ((currentStep - 1) / (steps?.length - 1)) * 100;

  return (
    <div className="relative px-12 py-16 w-full mx-auto bg-white/90">
      {/* Progress Bar Container */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[73px] w-[calc(100%-146px)] h-5 bg-gradient-to-r from-mentor-100/50 to-mentor-100/30 rounded-full overflow-hidden">
        {/* Charging Animation Bar */}
        <div
          className={cn(
            "absolute inset-0 h-full bg-gradient-to-r from-mentor-400/40 to-mentor-500/40 rounded-full",
            "animate-charging"
          )}
          style={{ width: `${progress}%` }}
        />

        {/* Main Progress Bar */}
        <div
          className={cn(
            "relative h-full bg-gradient-to-r opacity-70 from-mentor-300 to-mentor-400 rounded-full shadow-lg transition-all duration-300 ease-in-out",
            "animate-none"
          )}
          style={{ width: `${progress}%` }}
        >
          {/* Description inside the progress bar */}
          {steps[currentStep - 1] && (
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs whitespace-nowrap"
              style={{ opacity: currentStep === 1 ? 0 : 1 }}
            >
              {steps[currentStep - 1].description}
            </span>
          )}
        </div>
      </div>

      {/* Steps */}
      {/* <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <Step
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
            isActive={currentStep === index + 1}
            isCompleted={currentStep > index + 1}
            onClick={() => onStepClick(index + 1)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default StepProgress;

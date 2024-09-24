import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CallBackProps, Props, STATUS, Step } from "react-joyride";
import { Button } from "~/components/ui/button";

const localStorageKey = "completedOnboardingSteps";

export function useOnboarding(steps: Step[]) {
  const [run, setRun] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const completedSteps = getCompletedSteps();

    return steps.some((step) => !completedSteps.includes(step.target));
  });

  const handleOnboardingCallback = (data: CallBackProps) => {
    if (data.lifecycle === "complete") {
      addCompletedStep(data.step.target.toString());

      setRun(steps.some((s) => !getCompletedSteps().includes(s.target)));
    }

    if (data.status === STATUS.SKIPPED) {
      setCompletedSteps(steps.map((step) => step.target.toString()));

      setRun(false);
    }
  };

  const filteredSteps = steps.filter(
    (step) => !getCompletedSteps().includes(step.target),
  );

  const resetCompletedSteps = () => {
    localStorage.removeItem(localStorageKey);
    setRun(true);
  };

  return {
    resetCompletedSteps,
    defaultProps: {
      run,
      steps: filteredSteps,
      continuous: true,
      showSkipButton: true,
      scrollToFirstStep: true,
      callback: handleOnboardingCallback,
      styles: {
        options: {
          arrowColor: "#6a3ef6",
          backgroundColor: "#6a3ef6",
          overlayColor: "rgba(0, 0, 0, 0.2)",
          primaryColor: "#6a3ef6",
          textColor: "#FFFFFF",
          width: "25rem",
          zIndex: 1000,
        },
      },
      showProgress: true,
      tooltipComponent: ({
        index,
        tooltipProps,
        primaryProps,
        closeProps,
        backProps,
        skipProps,
        step,
        isLastStep,
      }) => (
        <div
          className="relative max-w-md rounded-2xl bg-[#6a3ef6] p-6 text-white shadow-lg"
          {...tooltipProps}
        >
          <Button
            variant="ghost"
            size="icon"
            {...closeProps}
            className="absolute right-5 top-5 rounded-full"
          >
            <XMarkIcon className="size-5" />
          </Button>
          <h2 className="mb-4 text-2xl font-bold">{step.title}</h2>
          <p className="mb-6">{step.content}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {index + 1} of {steps.length}
            </span>
            <div className="flex items-center space-x-2">
              {!isLastStep && (
                <Button variant="ghost" {...skipProps}>
                  Skip
                </Button>
              )}
              {index > 0 && (
                <Button variant="secondary" {...backProps}>
                  <ChevronLeftIcon className="size-5" />
                  <span className="ml-1">Back</span>
                </Button>
              )}
              <Button variant="secondary" {...primaryProps}>
                {isLastStep ? (
                  <>
                    Done <CheckCircleIcon className="ml-1 size-5" />
                  </>
                ) : (
                  <>
                    Next <ChevronRightIcon className="ml-1 size-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ),
    } satisfies Props,
  };
}

function getCompletedSteps() {
  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(localStorage.getItem(localStorageKey) || "[]");
}

function addCompletedStep(step: string) {
  const completedSteps = getCompletedSteps();
  setCompletedSteps([...completedSteps, step]);
}

function setCompletedSteps(steps: string[]) {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify([...new Set([...getCompletedSteps(), ...steps])]),
  );
}

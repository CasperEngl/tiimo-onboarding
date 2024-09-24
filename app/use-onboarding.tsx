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
    (step) => !getCompletedSteps().includes(step.target)
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
        tooltip: {
          borderRadius: "1rem",
          padding: "1.25rem",
        },
        tooltipTitle: {
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "1.35rem",
        },
        tooltipContent: {
          textAlign: "left",
          padding: "0.5rem 0",
        },
        buttonNext: {
          backgroundColor: "#FFFFFF",
          borderRadius: "1.25rem",
          color: "#8B5CF6",
          fontSize: "1rem",
          padding: "0.5rem 1rem",
        },
        buttonSkip: {
          color: "#FFFFFF",
          fontSize: "1rem",
        },
      },
      showProgress: true,
      floaterProps: {
        styles: {
          floater: {
            filter: "none",
          },
        },
      },
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
          className="bg-[#6a3ef6] text-white p-6 rounded-2xl max-w-md shadow-lg relative"
          {...tooltipProps}
        >
          <Button
            variant="ghost"
            size="icon"
            {...closeProps}
            className="absolute rounded-full top-5 right-5"
          >
            <XMarkIcon className="size-5" />
          </Button>
          <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
          <p className="mb-6">{step.content}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {index + 1} of {steps.length}
            </span>
            <div className="space-x-2 flex items-center">
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
    JSON.stringify([...new Set([...getCompletedSteps(), ...steps])])
  );
}

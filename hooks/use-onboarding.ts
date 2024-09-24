import { useState } from "react";
import { CallBackProps, STATUS, Step } from "react-joyride";

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
    },
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

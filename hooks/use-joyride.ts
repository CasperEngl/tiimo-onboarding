import { useState } from "react";
import { CallBackProps, STATUS, Step } from "react-joyride";

const localStorageKey = "completedJoyrideSteps";

export function useJoyride(steps: Step[]) {
  const [run, setRun] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const completedSteps = getCompletedSteps();

    return steps.some((step) => !completedSteps.includes(step.target));
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
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

  return {
    run,
    setRun,
    steps: filteredSteps,
    handleJoyrideCallback,
  };
}

function getCompletedSteps() {
  return JSON.parse(localStorage.getItem(localStorageKey) || "[]");
}

function addCompletedStep(step: string) {
  const completedSteps = getCompletedSteps();
  setCompletedSteps([...completedSteps, step]);
}

function setCompletedSteps(steps: string[]) {
  localStorage.setItem(localStorageKey, JSON.stringify([...new Set(steps)]));
}

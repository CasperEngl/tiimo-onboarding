import { useState } from "react";
import { Step, STATUS, CallBackProps, Callback } from "react-joyride";

const localStorageKey = "joyrideStatus";

export function joyrideCallbacks(middlewares: Callback[]) {
  return (data: CallBackProps) => {
    for (const middleware of middlewares) {
      middleware(data);
    }
  };
}

export function useJoyride(steps: Step[]) {
  const [run, setRun] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedStatus = localStorage.getItem(localStorageKey);

    return savedStatus !== STATUS.SKIPPED;
  });

  const handleSkipped = (data: CallBackProps) => {
    if (data.status === STATUS.SKIPPED) {
      localStorage.setItem("joyrideStatus", data.status);
      setRun(false);
    }
  };

  return {
    run,
    setRun,
    steps,
    handleSkipped,
  };
}

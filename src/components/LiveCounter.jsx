import React from "react";
import { useLiveCounter } from "../utils/useLiveCounter";

export function LiveCounter({
  timestamp1,
  value1,
  timestamp2,
  value2,
  className = ""
}) {
  const [displayValue, stopCounter] = useLiveCounter(
    timestamp1,
    value1,
    timestamp2,
    value2
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => stopCounter();
  }, [stopCounter]);

  return <span className={className}>{displayValue}</span>;
}

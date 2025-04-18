import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for creating a live counter that updates based on a rate calculated from two timestamp-value samples, using data sampled from https://www.worldometers.info/
 *
 * @param {number} timestamp1 - First timestamp (epoch time in seconds)
 * @param {number} value1 - Value at the first timestamp
 * @param {number} timestamp2 - Second timestamp (epoch time in seconds)
 * @param {number} value2 - Value at the second timestamp
 * @param {function} formatFn - Formatting function for the displayed value
 * @returns {[string, function]} - Returns the formatted value and a function to stop the counter
 */
export function useLiveCounter(
  timestamp1,
  value1,
  timestamp2,
  value2,
  formatFn = (value) => Math.round(value).toLocaleString()
) {
  const [displayValue, setDisplayValue] = useState("");
  const timeoutRef = useRef(null);
  const currentValueRef = useRef(0);

  // Calculate rate of change per second
  const timeDiff = timestamp2 - timestamp1;
  const valueDiff = value2 - value1;
  const valuePerSecond = timeDiff !== 0 ? valueDiff / timeDiff : 0;

  useEffect(() => {
    // Initialize current value based on time elapsed since first timestamp
    const currentEpochTime = Math.floor(Date.now() / 1000);
    const secondsElapsed = currentEpochTime - timestamp1;
    currentValueRef.current = Math.floor(
      value1 + secondsElapsed * valuePerSecond
    );
    setDisplayValue(formatFn(currentValueRef.current));

    if (valuePerSecond === 0) return;

    const scheduleNextIncrement = (currentVal) => {
      const increment = valuePerSecond >= 0 ? 1 : -1;
      const nextValue = Math.floor(currentVal) + increment;

      // Calculate the exact time (in ms since epoch) when the nextValue should be reached
      const timeToNextValueSeconds = (nextValue - value1) / valuePerSecond;
      const nextValueTimestamp = (timestamp1 + timeToNextValueSeconds) * 1000;

      const now = Date.now();
      let delay = nextValueTimestamp - now;

      // Ensure delay is not negative (can happen due to calculation/timing)
      // Also handle potential scheduling far in the past if the counter starts behind
      if (delay < 0) {
        // If the target time is in the past, calculate how many increments we missed
        const expectedValueNow =
          value1 + (now / 1000 - timestamp1) * valuePerSecond;
        const missedIncrements =
          Math.floor(expectedValueNow) - Math.floor(currentVal);
        if (Math.abs(missedIncrements) >= 1) {
          // Jump ahead if needed
          const newValue = Math.floor(currentVal) + missedIncrements;
          currentValueRef.current = newValue;
          setDisplayValue(formatFn(newValue));
          scheduleNextIncrement(newValue);
          return;
        } else {
          // Otherwise, schedule the next increment immediately or very soon
          delay = 0;
        }
      }

      timeoutRef.current = setTimeout(() => {
        currentValueRef.current = nextValue;
        setDisplayValue(formatFn(nextValue));
        scheduleNextIncrement(nextValue); // Schedule the *next* one
      }, delay);
    };

    // Start the process
    scheduleNextIncrement(currentValueRef.current);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timestamp1, value1, valuePerSecond, formatFn]);

  const stopCounter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return [displayValue, stopCounter];
}

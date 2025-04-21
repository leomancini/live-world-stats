import React from "react";
import { useEffect, useRef, useState } from "react";

// Counter that never resets
export function ContinuousCounter({
  ratePerSecond,
  formatFn = (value) => Math.floor(value).toLocaleString(),
  baselineValue = 0,
  baselineTimestamp = Date.now()
}) {
  const [displayValue, setDisplayValue] = useState("");
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const updateValue = () => {
      const now = Date.now();
      const secondsElapsed = (now - baselineTimestamp) / 1000;
      const currentValue = baselineValue + secondsElapsed * ratePerSecond;
      setDisplayValue(formatFn(currentValue));
      animationFrameRef.current = requestAnimationFrame(updateValue);
    };

    updateValue();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ratePerSecond, formatFn, baselineValue, baselineTimestamp]);

  return <span>{displayValue}</span>;
}

// Counter that resets at midnight each day
export function DailyCounter({
  ratePerSecond,
  formatFn = (value) => Math.floor(value).toLocaleString(),
  baselineValue = 0,
  baselineTimestamp = new Date().getTime()
}) {
  const [displayValue, setDisplayValue] = useState("");
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const updateValue = () => {
      const now = new Date();
      const baselineDate = new Date(baselineTimestamp);

      // If we're in the same day as the baseline
      if (baselineDate.toDateString() === now.toDateString()) {
        const midnight = new Date(now);
        midnight.setHours(0, 0, 0, 0);
        const secondsSinceMidnight = (now - midnight) / 1000;
        const secondsSinceBaseline = (now - baselineDate) / 1000;

        // Calculate how much should have accumulated by the baseline time
        const valueAtBaseline =
          ((baselineDate - midnight) / 1000) * ratePerSecond;
        // Calculate the difference between what we have and what we should have
        const adjustment = baselineValue - valueAtBaseline;
        // Add the adjustment to the current value
        const currentValue = secondsSinceMidnight * ratePerSecond + adjustment;

        setDisplayValue(formatFn(currentValue));
      } else {
        // If we're in a different day, just calculate from midnight
        const midnight = new Date(now);
        midnight.setHours(0, 0, 0, 0);
        const secondsSinceMidnight = (now - midnight) / 1000;
        const currentValue = secondsSinceMidnight * ratePerSecond;
        setDisplayValue(formatFn(currentValue));
      }

      animationFrameRef.current = requestAnimationFrame(updateValue);
    };

    updateValue();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ratePerSecond, formatFn, baselineValue, baselineTimestamp]);

  return <span>{displayValue}</span>;
}

// Counter that resets at midnight on Dec 31 each year
export function YearlyCounter({
  ratePerSecond,
  formatFn = (value) => Math.floor(value).toLocaleString(),
  baselineValue = 0,
  baselineTimestamp = new Date().getTime()
}) {
  const [displayValue, setDisplayValue] = useState("");
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const updateValue = () => {
      const now = new Date();
      const baselineDate = new Date(baselineTimestamp);

      // If we're in the same year as the baseline
      if (baselineDate.getFullYear() === now.getFullYear()) {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const secondsSinceYearStart = (now - yearStart) / 1000;
        const secondsSinceBaseline = (now - baselineDate) / 1000;

        // Calculate how much should have accumulated by the baseline time
        const valueAtBaseline =
          ((baselineDate - yearStart) / 1000) * ratePerSecond;
        // Calculate the difference between what we have and what we should have
        const adjustment = baselineValue - valueAtBaseline;
        // Add the adjustment to the current value
        const currentValue = secondsSinceYearStart * ratePerSecond + adjustment;

        setDisplayValue(formatFn(currentValue));
      } else {
        // If we're in a different year, just calculate from year start
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const secondsSinceYearStart = (now - yearStart) / 1000;
        const currentValue = secondsSinceYearStart * ratePerSecond;
        setDisplayValue(formatFn(currentValue));
      }

      animationFrameRef.current = requestAnimationFrame(updateValue);
    };

    updateValue();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ratePerSecond, formatFn, baselineValue, baselineTimestamp]);

  return <span>{displayValue}</span>;
}

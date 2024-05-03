import { useState, useEffect } from "react";

const useResendEmail = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const [countDown, setCountDown] = useState<number | undefined | null>(null);

  useEffect(() => {
    if (!targetDate || !countDown || countDown < 0) return;

    const timer = setTimeout(() => {
      setCountDown(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown, targetDate]);

  useEffect(() => {
    if (!targetDate) return;
    setCountDown(targetDate.getTime() - new Date().getTime());
  }, [targetDate]);

  const updateTargetDate = async (date: Date) => {
    setTargetDate(date);
  };

  return { countDown, updateTargetDate };
};

export default useResendEmail;

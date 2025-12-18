import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function: หยุดเวลาเมื่อ component นี้ถูกปิด
    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <h3>
      Current Time: {time.toLocaleTimeString()}
    </h3>
  );
}
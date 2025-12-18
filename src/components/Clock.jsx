import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

<<<<<<< HEAD
=======
    // Cleanup function: หยุดเวลาเมื่อ component นี้ถูกปิด
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
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
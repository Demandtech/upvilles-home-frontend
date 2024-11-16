import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CounterProps {
  targetNumber: number | undefined;
  labelColor?: string;
}

const Counter: React.FC<CounterProps> = ({ targetNumber, labelColor }) => {
  const [count, setCount] = useState(0);

  const countSpring = useSpring(0, {
    stiffness: 80,
    damping: 20,
    duration: 0.1,
  });

  useEffect(() => {
    if (!targetNumber) {
      countSpring.set(0);
      return;
    }

    countSpring.set(targetNumber);

    const unsubscribe = countSpring.on("change", (latest) => {
      setCount(latest);
    });

    return () => unsubscribe();
  }, [countSpring, targetNumber]);

  return (
    <motion.div className="text-3xl font-semibold text-default">
      <p style={{ color: labelColor }}>{Math.floor(count)}</p>
    </motion.div>
  );
};

export default Counter;

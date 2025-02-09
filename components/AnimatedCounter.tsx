"use client";
import React from "react";
import CountUp from "react-countup";
import TotalBalanceBox from "./TotalBalanceBox";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div>
      <CountUp
        className="w-full"
        end={amount}
        duration={2.75}
        decimals={2}
        decimal="."
        prefix="$"
      />
    </div>
  );
};

// const AnimatedCounter: React.FC<{amount: number}> = ({amount}) => {
//   return (
//     <div>
//       <CountUp
//         className="w-full"
//         end={amount}
//         duration={2.75}
//         decimals={2}
//         decimal="."
//         prefix="₹"
//       />
//     </div>
//   );
// };
export default AnimatedCounter;

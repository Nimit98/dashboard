import React from "react";
import { Line } from "recharts";

function Attention({ emotions }) {
  console.log(emotions);
  return (
    <div>
      {emotions.includes("Attention") ? (
        <Line type="monotone" stroke="blue" dataKey="Attention %" />
      ) : (
        ""
      )}
      {emotions.includes("Attention") ? (
        <Line type="monotone" stroke="blue" dataKey="Attention Avg" />
      ) : (
        ""
      )}
    </div>
  );
}

export default Attention;

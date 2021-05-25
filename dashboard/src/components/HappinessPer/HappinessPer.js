import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  CartesianGrid,
} from "recharts";

import "./HappinessPer.css";

const HappinessPer = ({ data_new }) => {
  const dataSorted = data_new
    .sort(
      (row1, row2) =>
        row1.seconds - row2.seconds ||
        row1.video_id.localeCompare(row2.video_id)
    )
    .map((d) => ({
      video_id: d.video_id,
      seconds: d.seconds,
      happiness: d.happiness,
    }));

  const totalVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    //eslint-disable-next-line
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  const totalVid2 = dataSorted
    .filter((d) => d.video_id === "vid_002")
    //eslint-disable-next-line
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  const happVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    //eslint-disable-next-line
    .filter((d) => d.happiness === 1)
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  const happVid2 = dataSorted
    .filter((d) => d.video_id === "vid_002")
    //eslint-disable-next-line
    .filter((d) => d.happiness === 1)
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  let final_data = [];
  let i = 0,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
  while (
    i <
    Math.max(
      Object.keys(happVid1).length,
      Object.keys(happVid2).length,
      Object.keys(totalVid1).length,
      Object.keys(totalVid2).length
    )
  ) {
    let x1, x2;

    // console.log(m,parseInt(Object.keys(happVid2)[m]), i, parseInt(Object.keys(totalVid2)[k]));

    if (
      parseInt(Object.keys(totalVid1)[j]) === i &&
      parseInt(Object.keys(happVid1)[l]) === i
    ) {
      x1 =
        Math.round(
          (Object.values(happVid1)[l] / Object.values(totalVid1)[j]) * 10000
        ) / 100;
      j++;
      l++;
    } else {
      x1 = 0;
      if (parseInt(Object.keys(totalVid1)[j]) <= i) {
        j++;
      }
      if (parseInt(Object.keys(happVid1)[l]) <= i) {
        l++;
      }
    }

    if (
      parseInt(Object.keys(totalVid2)[k]) === i &&
      parseInt(Object.keys(happVid2)[m]) === i
    ) {
      x2 =
        Math.round(
          (Object.values(happVid2)[m] / Object.values(totalVid2)[k]) * 10000
        ) / 100;
      k++;
      m++;
    } else {
      x2 = 0;
      if (parseInt(Object.keys(totalVid2)[k]) <= i) {
        k++;
      }
      if (parseInt(Object.keys(happVid2)[m]) <= i) {
        m++;
      }
    }

    final_data.push({
      seconds: i,
      vid_001: x1,
      vid_002: x2,
    });
    i++;
  }

  // console.log(final_data);

  return (
    <div id="hapPer">
      <h1 id="HapPerFormat">Happiness %</h1>
      <AreaChart
        height={500}
        width={700}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        data={final_data}
        fontSize={16}
      >
        <XAxis
          dataKey="seconds"
          tickLine={false}
          tick={false}
          label={{
            value: "Video-Instant in seconds",
            position: "inside",
            offset: 0,
          }}
          name="seconds"
        />
        <YAxis
          tickLine={false}
          label={{
            value: "Happiness%",
            angle: -90,
            position: "insideLeft",
            offset: 20,
          }}
          tickMargin={0}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} iconType="square" />
        <Area
          type="monotone"
          dataKey="vid_001"
          stroke="blue"
          fillOpacity={0.5}
          fill="blue"
        />
        <Area
          type="monotone"
          dataKey="vid_002"
          stroke="purple"
          fillOpacity={0.5}
          fill="purple"
        />
      </AreaChart>
    </div>
  );
};

export default HappinessPer;

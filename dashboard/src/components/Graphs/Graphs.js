import React from "react";
import Happiness from "../HappinessPer/HappinessPer";
import Attention from "./Attention/Attention";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Graphs({ data_new, emotions, metrics }) {
  console.log(emotions.includes("Attention"));
  const dataSorted = data_new
    .sort(
      (row1, row2) =>
        row1.seconds - row2.seconds ||
        row1.video_id.localeCompare(row2.video_id)
    )
    .map((d) => ({
      video_id: d.video_id,
      seconds: d.seconds,
      attention: d.attention,
      happiness: d.happiness,
      eye_pupil: d.eye_pupil,
      eye_gaze: d.eye_gaze,
      smile: d.smile,
    }));

  const totalVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    //eslint-disable-next-line
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  const attVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    //eslint-disable-next-line
    .filter((d) => d.attention === 1)
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

  const pupilVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    .filter((d) => d.eye_pupil === 1)
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  const gazeVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    .filter((d) => d.eye_gaze === 1)
    //eslint-disable-next-line
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  const smileVid1 = dataSorted
    .filter((d) => d.video_id === "vid_001")
    .filter((d) => d.smile === 1)
    .reduce(
      (prev, cur) => ((prev[cur.seconds] = ++prev[cur.seconds] || 1), prev),
      {}
    );

  let final_data = [];

  let i = 0,
    a = 0,
    b = 0,
    c = 0,
    d = 0,
    e = 0,
    f = 0,
    g = 0,
    h = 0,
    l = 0,
    j = 0;
  while (
    i <
    Math.max(
      Object.keys(totalVid1).length,
      Object.keys(attVid1).length,
      Object.keys(happVid1).length,
      Object.keys(pupilVid1).length,
      Object.keys(gazeVid1).length,
      Object.keys(smileVid1).length

      // Object.keys(attVid2).length,
      // Object.keys(totalVid2).length
    )
  ) {
    let data = {};
    let attenx,
      happx,
      pupilx,
      gazex,
      smilex,
      attenavg,
      pupilavg,
      gazeAvg,
      smileAvg,
      happAvg;

    // console.log(m,parseInt(Object.keys(attVid2)[m]), i, parseInt(Object.keys(totalVid2)[k]));

    if (emotions.includes("Attention")) {
      if (
        parseInt(Object.keys(totalVid1)[a]) === i &&
        parseInt(Object.keys(attVid1)[b]) === i
      ) {
        if (metrics.length == 0 || metrics.includes("% of People")) {
          attenx =
            Math.round(
              (Object.values(attVid1)[b] / Object.values(totalVid1)[a]) * 10000
            ) / 100;
          data["Attention %"] = attenx;
        }
        if (metrics.includes("Average")) {
          attenavg = Object.values(attVid1)[b] / Object.values(totalVid1)[a];

          data["Attention Avg"] = attenavg.toFixed(2);
        }
        a++;
        b++;
      } else {
        attenx = 0;
        attenavg = 0;
        if (parseInt(Object.keys(totalVid1)[a]) <= i) {
          a++;
        }
        if (parseInt(Object.keys(attVid1)[b]) <= i) {
          b++;
        }
      }
    }

    if (
      parseInt(Object.keys(totalVid1)[c]) === i &&
      parseInt(Object.keys(pupilVid1)[d]) === i &&
      emotions.includes("Eye Pupil")
    ) {
      if (metrics.length == 0 || metrics.includes("% of People")) {
        pupilx =
          Math.round(
            (Object.values(pupilVid1)[d] / Object.values(totalVid1)[c]) * 10000
          ) / 100;
        data["Pupil %"] = pupilx;
      }
      if (metrics.includes("Average")) {
        pupilavg = Object.values(pupilVid1)[d] / Object.values(totalVid1)[c];
        data["Pupil Avg"] = pupilavg.toFixed(2);
      }
      c++;
      d++;
    } else {
      pupilx = 0;
      pupilavg = 0;
      if (parseInt(Object.keys(totalVid1)[c]) <= i) {
        c++;
      }
      if (parseInt(Object.keys(pupilVid1)[d]) <= i) {
        d++;
      }
    }

    if (
      parseInt(Object.keys(totalVid1)[e]) === i &&
      parseInt(Object.keys(gazeVid1)[f]) === i &&
      emotions.includes("Eye Gaze")
    ) {
      if (metrics.length == 0 || metrics.includes("% of People")) {
        gazex =
          Math.round(
            (Object.values(gazeVid1)[f] / Object.values(totalVid1)[e]) * 10000
          ) / 100;
        data["Eye Gaze %"] = gazex;
      }
      if (metrics.includes("Average")) {
        gazeAvg = Object.values(gazeVid1)[f] / Object.values(totalVid1)[e];
        data["Eye Gaze Avg"] = gazeAvg.toFixed(2);
      }
      e++;
      f++;
    } else {
      gazex = 0;
      gazeAvg = 0;
      if (parseInt(Object.keys(totalVid1)[e]) <= i) {
        e++;
      }
      if (parseInt(Object.keys(gazeVid1)[f]) <= i) {
        f++;
      }
    }

    if (
      parseInt(Object.keys(totalVid1)[g]) === i &&
      parseInt(Object.keys(smileVid1)[h]) === i &&
      emotions.includes("Smile")
    ) {
      if (metrics.length == 0 || metrics.includes("% of People")) {
        smilex =
          Math.round(
            (Object.values(smileVid1)[h] / Object.values(totalVid1)[g]) * 10000
          ) / 100;
        data["Smile %"] = smilex;
      }
      if (metrics.includes("Average")) {
        smileAvg = Object.values(smileVid1)[h] / Object.values(totalVid1)[g];
        data["Smile Avg"] = smileAvg.toFixed(2);
      }
      g++;
      h++;
    } else {
      smilex = 0;
      smileAvg = 0;
      if (parseInt(Object.keys(totalVid1)[g]) <= i) {
        g++;
      }
      if (parseInt(Object.keys(smileVid1)[h]) <= i) {
        h++;
      }
    }

    if (
      parseInt(Object.keys(totalVid1)[j]) === i &&
      parseInt(Object.keys(happVid1)[l]) === i &&
      emotions.includes("Happiness")
    ) {
      if (metrics.length == 0 || metrics.includes("% of People")) {
        happx =
          Math.round(
            (Object.values(happVid1)[l] / Object.values(totalVid1)[j]) * 10000
          ) / 100;
        data["Happiness %"] = happx;
      }
      if (metrics.includes("Average")) {
        happAvg = Object.values(happVid1)[l] / Object.values(totalVid1)[j];
        data["Happiness Avg"] = happAvg.toFixed(2);
      }
      j++;
      l++;
    } else {
      happx = 0;
      happAvg = 0;
      if (parseInt(Object.keys(totalVid1)[j]) <= i) {
        j++;
      }
      if (parseInt(Object.keys(happVid1)[l]) <= i) {
        l++;
      }
    }
    data["seconds"] = i;
    final_data.push(data);
    i++;
  }

  return (
    <div id="attper">
      <h1 id="AttPerFormat">Attention %</h1>
      <LineChart
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
            value: "Attention%",
            angle: -90,
            position: "insideLeft",
            offset: 20,
          }}
          tickMargin={0}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip />

        <Line type="monotone" stroke="blue" dataKey="Attention %" />
        <Line type="monotone" stroke="blue" dataKey="Attention Avg" />

        <Line type="monotone" stroke="orange" dataKey="Pupil %" />
        <Line type="monotone" stroke="orange" dataKey="Pupil Avg" />

        <Line type="monotone" stroke="purple" dataKey="Eye Gaze %" />
        <Line type="monotone" stroke="purple" dataKey="Eye Gaze Avg" />

        <Line type="monotone" stroke="red" dataKey="Happiness %" />
        <Line type="monotone" stroke="red" dataKey="Happiness Avg" />

        <Line type="monotone" stroke="green" dataKey="Smile %" />
        <Line type="monotone" stroke="green" dataKey="Smile Avg" />
      </LineChart>
      <Happiness data_new={data_new} />
    </div>
  );
}

export default Graphs;

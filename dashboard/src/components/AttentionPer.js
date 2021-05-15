import React from 'react';
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    Legend
  } from "recharts";

const AttentionPer = ({data_new}) => {

  const dataSorted = data_new.sort((row1, row2) => 
  row1.seconds - row2.seconds ||
  // row1.user_id - row2.user_id);
  row1.video_id.localeCompare(row2.video_id)).map(d => ({
    video_id: d.video_id,
    seconds: d.seconds,
    user_id: d.user_id,
    attention: d.attention
  }));

  const totalVid1 = dataSorted.filter(d => d.video_id==='vid_001')
   //eslint-disable-next-line
    .reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  const totalVid2 = dataSorted.filter(d => d.video_id==='vid_002')
   //eslint-disable-next-line
    .reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});
 
  const attVid1 = dataSorted.filter(d => d.video_id==='vid_001')
  //eslint-disable-next-line
    .filter(d => d.attention===1).reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  const attVid2 = dataSorted.filter(d => d.video_id==='vid_002')
   //eslint-disable-next-line
    .filter(d => d.attention===1).reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  let final_data = [];
  let i=0,j=0,k=0;
  while(i<Math.max(Object.keys(attVid1).length, Object.keys(attVid2).length, Object.keys(totalVid1).length,
  Object.keys(totalVid2).length)) {
    let x1, x2;

    if(parseInt(Object.keys(totalVid1)[j]) === i && parseInt(Object.keys(attVid1)[j])===i) {
      x1=Math.round(Object.values(attVid1)[j]/Object.values(totalVid1)[j]*10000)/100;
      j++;
    } else {
      x1=0;
    }

    if(parseInt(Object.keys(totalVid2)[k]) === i && parseInt(Object.keys(attVid2)[k])===i) { 
      x2=Math.round(Object.values(attVid2)[k]/Object.values(totalVid2)[k]*10000)/100;
      k++;
    } else {
      x2=0;
    }

    console.log(k,parseInt(Object.keys(totalVid2)[k]),i, parseInt(Object.keys(attVid2)[k]), i)

    final_data.push({
      seconds:i,
      vid_001: x1,
      vid_002: x2,
    });
    i++;
  }

  // console.log(Object.keys(attVid2), Object.values(attVid2));

  return (
    <AreaChart height={300} width={700} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} data={final_data}>
      <XAxis dataKey="seconds"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend/>
      <Area type="monotone" dataKey="vid_001" stroke="#8884d8" fillOpacity={0.5} fill="blue" />
      <Area type="monotone" dataKey="vid_002" stroke="#82ca9d" fillOpacity={0.5} fill="purple" />
    </AreaChart>
  );
}  

export default AttentionPer;
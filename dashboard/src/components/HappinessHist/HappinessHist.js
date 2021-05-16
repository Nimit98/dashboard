import React from 'react';
// import {
//     AreaChart,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Area,
//     Legend,
//     CartesianGrid,
//   } from "recharts";

const HappinessHist = ({data_new}) => {

  const dataSorted = data_new
    .sort((row1, row2) => row1.seconds - row2.seconds 
      || row2.gender.localeCompare(row1.gender))
    .map(d => ({
        seconds: d.seconds,
        gender: d.gender,
        happiness: d.happiness
    }));

  // console.log(dataSorted);

  const totalMale = dataSorted.filter(d => d.gender==='male')
   //eslint-disable-next-line
    .reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  const totalFemale = dataSorted.filter(d => d.gender==='female')
   //eslint-disable-next-line
    .reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});
 
  const hapMale = dataSorted.filter(d => d.gender==='male')
  //eslint-disable-next-line
    .filter(d => d.happiness===1).reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  const hapFemale = dataSorted.filter(d => d.gender==='female')
   //eslint-disable-next-line
    .filter(d => d.happiness===1).reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  // console.log(hapMale);
  // console.log(hapFemale);

  let final_data = [];
  let i=0,j=0,k=0,l=0,m=0;
  while(i<Math.max(Object.keys(hapMale).length, Object.keys(hapFemale).length, Object.keys(totalMale).length,
  Object.keys(totalFemale).length)) {
    let x1, x2;

    // console.log(m,parseInt(Object.keys(attVid2)[m]), i, parseInt(Object.keys(totalFemale)[k]));

    if(parseInt(Object.keys(totalMale)[j]) === i && parseInt(Object.keys(hapMale)[l])===i) {
      x1=Math.round(Object.values(hapMale)[l]/Object.values(totalMale)[j]*10000)/100;
      j++;
      l++;
    } else {
      x1=0;
      if(parseInt(Object.keys(totalMale)[j]) <= i){
      j++;}
      if(parseInt(Object.keys(hapMale)[l]) <= i){
      l++;}
    }

    if(parseInt(Object.keys(totalFemale)[k]) === i && parseInt(Object.keys(hapFemale)[m])===i) { 
      x2=Math.round(Object.values(hapFemale)[m]/Object.values(totalFemale)[k]*10000)/100;
      k++;
      m++;
    } else {
      x2=0;
      if(parseInt(Object.keys(totalFemale)[k]) <= i) {
        k++;
      }
      if(parseInt(Object.keys(hapFemale)[m]) <= i) {
        m++;
      }
    }

    final_data.push({
      seconds:i,
      vid_001: x1,
      vid_002: x2,
    });
    i++;
  }

  // console.log(Object.keys(attVid2), Object.values(attVid2));

  return (
    <div id ="hapPer">
    <h1 id="HapPerFormat">Happiness Histogram</h1>
     {/* <AreaChart 
      height={300} 
      width={700} 
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }} 
      data={final_data}
      fontSize={16}>
      <XAxis 
        dataKey="seconds"
        tickLine={false} 
        tick={false} 
        label={{ value: 'Video-Instant in seconds', position: 'inside', offset: 0 }}
        name="seconds"  
        />
      <YAxis tickLine={false} label={{ value: 'Happiness%', angle: -90, position: 'insideLeft', offset: 20 }} tickMargin={0}/>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <Tooltip/>
      <Legend verticalAlign="top" height={36} iconType="square"/>
      <Area type="monotone" dataKey="vid_001" stroke="blue" fillOpacity={0.5} fill="blue" />
      <Area type="monotone" dataKey="vid_002" stroke="purple" fillOpacity={0.5} fill="purple"/>
    </AreaChart> */}
    </div>
  );
}  

export default HappinessHist;
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

import * as d3ar from 'd3-array';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const AttentionHist = ({data_new}) => {

  const dataSorted = data_new
    .sort((row1, row2) => row1.seconds - row2.seconds 
      || row2.gender.localeCompare(row1.gender))
    .map(d => ({
        seconds: d.seconds,
        gender: d.gender,
        attention: d.attention
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
    .filter(d => d.attention===1).reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});

  const hapFemale = dataSorted.filter(d => d.gender==='female')
   //eslint-disable-next-line
    .filter(d => d.attention===1).reduce((prev,cur) => (prev[cur.seconds] = ++prev[cur.seconds] || 1, prev), {});
    console.log(totalFemale)  
console.log(hapFemale)
  // console.log(hapMale);
  // console.log(hapFemale);

  let final_data = [];
  let i=0,j=0,k=0,l=0,m=0;
  let malePercents=[]
  let femalePercents=[]
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
   
    malePercents.push(x1)
   
    femalePercents.push(x2)
    
    i++;
  }
  
console.log(malePercents)
console.log(femalePercents)
malePercents.push(100)
femalePercents.push(100)
let maleBins=d3ar.bin().domain([0,100]).thresholds([0,10,20,30,40,50,60,70,80,90,100])(malePercents);
let femaleBins=d3ar.bin().domain([0,100]).thresholds([0,10,20,30,40,50,60,70,80,90,100])(femalePercents);
console.log(maleBins.length)
console.log(maleBins)
console.log(femaleBins)
let final_male_data=maleBins.reduce((acc, el) => {
  

  acc.push({
      x: el.x0 ,
      y: el.length    
  })
  return acc;
},[]);
let final_female_data=femaleBins.reduce((acc, el) => {
  

  acc.push({
      x: el.x0 ,
      y: el.length    
  })
  return acc;
},[]);

for(let i=0;i<11;i++){
final_data.push({attention:i*10,male:final_male_data[i].y,female:final_female_data[i].y})
}
console.log(final_data)
  // console.log(Object.keys(attVid2), Object.values(attVid2));

  return (
    <div id ="hapPer">
    <h1 id="HapPerFormat">Attention Histogram</h1>
    <BarChart
         height={500} 
         width={700} 
          data={final_data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }} 
          fontSize={16}>
        
            
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            label={{ value: 'Attention %', position: 'inside', dy: 15 }}
          dataKey="attention" />
          <YAxis label={{ value: 'Viewer Count', angle: -90, position: 'insideLeft', offset: 20 }} />
          <Tooltip />
          <Legend layout="vertical" verticalAlign="top" align="right"height={36} iconType="square" />
          <Bar name="Male" dataKey="male" stackId="a" fill="#6DA0C7" opacity='0.6'/>
          <Bar name="Female" dataKey="female" stackId="a" fill="#AE60BD" opacity='0.6' />
         
        </BarChart>
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
      <YAxis tickLine={false} label={{ value: 'Attention%', angle: -90, position: 'insideLeft', offset: 20 }} tickMargin={0}/>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <Tooltip/>
      <Legend verticalAlign="top" height={36} iconType="square"/>
      <Area type="monotone" dataKey="vid_001" stroke="blue" fillOpacity={0.5} fill="blue" />
      <Area type="monotone" dataKey="vid_002" stroke="purple" fillOpacity={0.5} fill="purple"/>
    </AreaChart> */}
    </div>
  );
}  

export default AttentionHist;
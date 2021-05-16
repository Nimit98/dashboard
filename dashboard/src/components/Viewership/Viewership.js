import React from 'react';
import {
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line,
  } from "recharts";

import './Viewership.css';

const Viewership = ({data_new}) => {

  const dataSorted = data_new.sort((row1, row2) => new Date(row1.dateofview)-new Date(row2.dateofview))
  .map(d => ({
    dateofview: d.dateofview,
    gender:d.gender
  }));

  const totalMale = dataSorted.filter(d => d.gender==='male')
   //eslint-disable-next-line
    .reduce((prev,cur) => (prev[cur.dateofview] = ++prev[cur.dateofview] || 1, prev), {});

  const totalFemale = dataSorted.filter(d => d.gender==='female')
   //eslint-disable-next-line
    .reduce((prev,cur) => (prev[cur.dateofview] = ++prev[cur.dateofview] || 1, prev), {});

  let final_data=[];
  for(let i=0;i<Math.max(Object.keys(totalMale).length,Object.keys(totalFemale).length);i++) {
      final_data.push({
          date:Object.keys(totalFemale)[i],
          male:Object.values(totalMale)[i], 
          female: Object.values(totalFemale)[i],
          total: Object.values(totalMale)[i]+Object.values(totalFemale)[i]
      });
  }

  console.log(final_data);

  return (
    <div id ="Viewership">
    <h1 id="ViewerHeading">Viewership Line Graph</h1>
    <LineChart 
      height={300} 
      width={700} 
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }} 
      data={final_data}
      fontSize={16}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="date"
        name="date"
        />
      <YAxis/>
      <Tooltip/>
      <Legend verticalAlign="top" height={36}/>
      <Line connectNulls type="monotone" dataKey="male" stroke="#FFBF00" />
      <Line connectNulls type="monotone" dataKey="female" stroke="blue"/>
      <Line connectNulls type="monotone" dataKey="total" stroke="green"/>
    </LineChart>
    </div>
  );
}  

export default Viewership;
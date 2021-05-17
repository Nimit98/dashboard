import React, { useState, useEffect } from "react";
import "./App.css";
import AttentionPer from './components/AttentionPer/AttentionPer';
import HappinessPer from './components/HappinessPer/HappinessPer';
import HappinessHist from './components/HappinessHist/HappinessHist';
import AttentionHist from './components/AttentionHist/AttentionHist';
import Viewership from './components/Viewership/Viewership';
import TreeMap from './components/TreeMap/TreeMap';

const url = "http://localhost:4000/api/analytics";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return "Loading...";

  const data_req=data.rows;

  // const toDate = (date) => {
  //   const [day, month, year] = date.split("/");
  //   return new Date(year, month - 1, day);
  // };

  const data_new = data_req.map(d => ({
    dateofview: d.dateofview,
    video_id: d.video_id,
    user_id: d.user_id,
    seconds: Math.round(parseFloat(d.seconds)*100),
    attention: parseInt(d.attention),
    eye_pupil: parseInt(d.eye_pupil),
    eye_gaze: parseInt(d.eye_gaze),
    smile: parseInt(d.smile),
    happiness: parseInt(d.happiness),
    gender: d.gender==='1' ? 'male' : 'female',
    age: d.age,
  }));

  return (
    <div id="parent">
      <AttentionPer data_new={data_new}/>
      <HappinessPer data_new={data_new}/>
      <Viewership data_new={data_new}/>
      <TreeMap data_new={data_new}/>
      <HappinessHist data_new={data_new}/>
      <AttentionHist data_new={data_new}/>
    </div>
  );
}

export default App;

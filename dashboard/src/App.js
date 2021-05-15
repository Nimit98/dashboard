import React, { useState, useEffect } from "react";
import "./App.css";
import AttentionPer from './components/AttentionPer/AttentionPer';
import HappinessPer from './components/HappinessPer/HappinessPer';

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

  const toDate = (date) => {
    const [day, month, year] = date.split("/");
    return new Date(year, month - 1, day);
  };

  const data_new = data_req.map(d => ({
    dateofview: toDate(d.dateofview),
    video_id: d.video_id,
    user_id: d.user_id,
    seconds: Math.round(parseFloat(d.seconds)*100),
    attention: parseInt(d.attention),
    eye_pupil: parseInt(d.eye_pupil),
    eye_gaze: parseInt(d.eye_gaze),
    smile: parseInt(d.smile),
    happiness: parseInt(d.happiness),
    gender: d.gender==='0' ? 'male' : 'female',
    age: d.age,
  }));

  return (
    <div id="parent">
      <AttentionPer data_new={data_new}/>
      <HappinessPer data_new={data_new}/>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AttentionPer from "./components/AttentionPer/AttentionPer";
import HappinessPer from "./components/HappinessPer/HappinessPer";
import HappinessHist from "./components/HappinessHist/HappinessHist";
import AttentionHist from "./components/AttentionHist/AttentionHist";
import Viewership from "./components/Viewership/Viewership";
import TreeMap from "./components/TreeMap/TreeMap";
import Metrics from "./components/Metrics/Metrics";

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

  const data_req = data.rows;
  // const toDate = (date) => {
  //   const [day, month, year] = date.split("/");
  //   return new Date(year, month - 1, day);
  // };

  const data_new = data_req.map((d) => ({
    dateofview: d.dateofview,
    video_id: d.video_id,
    user_id: d.user_id,
    seconds: Math.round(parseFloat(d.seconds) * 100),
    attention: parseInt(d.attention),
    eye_pupil: parseInt(d.eye_pupil),
    eye_gaze: parseInt(d.eye_gaze),
    smile: parseInt(d.smile),
    happiness: parseInt(d.happiness),
    gender: d.gender === "1" ? "male" : "female",
    age: d.age,
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Metrics />
        </div>
        <div className="col" id="parent">
          <div className="graph">
            <AttentionPer data_new={data_new} />
          </div>
          <div className="graph">
            <HappinessPer data_new={data_new} />
          </div>
          <div className="graph">
            <Viewership data_new={data_new} />
          </div>
          <div className="graph">
            <TreeMap data_new={data_new} />
          </div>
          <div className="graph">
            <HappinessHist data_new={data_new} />
          </div>
          <div className="graph">
            <AttentionHist data_new={data_new} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

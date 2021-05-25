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
import Graphs from "./components/Graphs/Graphs";

const url = "http://localhost:4000/api/analytics";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emotions, setEmotions] = useState([]);
  const [metrics, setMetrics] = useState([]);

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

  const handleEmotions = (white, d) => {
    if (white) {
      setEmotions(emotions.filter((item) => item != d));
    } else {
      setEmotions((emotions) => [...emotions, d]);
    }
  };

  const handleMetrics = (white, d) => {
    if (white) setMetrics(metrics.filter((item) => item != d));
    else setMetrics((metrics) => [...metrics, d]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Metrics
            handleMetrics={handleMetrics}
            handleEmotions={handleEmotions}
          />
        </div>
        <div className="col">
          <Graphs data_new={data_new} metrics={metrics} emotions={emotions} />
        </div>
      </div>
    </div>
  );
}

export default App;

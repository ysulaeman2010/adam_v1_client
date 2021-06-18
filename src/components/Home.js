import React from "react";
import WebcamCapture from "./WebcamCapture";

import { useSelector } from "react-redux";

import "../css/Home.css";

const Home = () => {
  const data = useSelector((state) => state);

  return (
    <div className="home">
      <div className="home__header">
        <div className="left__container">Data temp</div>
        <div className="right__container">
          <p>Status : {data.face.mask_status}</p>
          <p>Confidence : {data.face.confidence_level}</p>
        </div>
      </div>
      <div className="video__container">
        <WebcamCapture />
      </div>
      <div className="home__footer">Status</div>
    </div>
  );
};

export default Home;

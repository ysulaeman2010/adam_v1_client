import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

import Webcam from "react-webcam";

import { drawPath } from "../utils/functions";
import "../css/Home.css";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

const Home = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const paraRef = useRef(null);

  /* const paraText = document.getElementById("para"); */

  // const dispatch = useDispatch();

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 720, height: 360 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 2000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const detections = await net.estimateFaces(video);

      if (detections.length > 0) {
        const faceConfidence = detections[0].faceInViewConfidence;
        if (faceConfidence < 0.9) {
          //console.log(`Mask on, confidence level ${faceConfidence}`);
          paraRef
            ? (paraRef.current.innerHTML = `Mask on, confidence level ${(
                Math.abs(1 - faceConfidence) * 100
              ).toFixed(2)}%`)
            : console.log(`Mask on, confidence level ${faceConfidence}`);
        } else {
          //console.log(`Mask off, confidence level ${faceConfidence} `);
          paraRef
            ? (paraRef.current.innerHTML = `Mask off, confidence level ${(
                faceConfidence * 100
              ).toFixed(2)}%`)
            : console.log(`Mask off, confidence level ${faceConfidence} `);
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawPath(detections, ctx);
    }
  };

  runFacemesh();

  return (
    <div className="home">
      <div className="home__header">
        <div className="left__container">Data temp</div>
        <div className="right__container">
          <p id="para" ref={paraRef}>
            Test
          </p>
        </div>
      </div>
      <div className="video__container">
        <React.Fragment>
          <Webcam
            audio={false}
            height={videoConstraints.height}
            width={videoConstraints.width}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 720,
              height: 360,
              opacity: 0.8,
            }}
          />
        </React.Fragment>
      </div>
      <div className="home__footer"></div>
    </div>
  );
};

export default Home;

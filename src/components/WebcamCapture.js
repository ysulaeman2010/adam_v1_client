import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

import { drawPath } from "../utils/functions";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 720, height: 360 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
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
        if (faceConfidence < 0.8) {
          console.log(`Mask on, confidence level ${faceConfidence}`);
        } else {
          console.log(`Mask off, confidence level ${faceConfidence} `);
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawPath(detections, ctx);
    }
  };

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    console.log(`Image taken`);
  }, [webcamRef]);

  runFacemesh();

  return (
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
        }}
      />
    </React.Fragment>
  );
};

export default WebcamCapture;

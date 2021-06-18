import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

import * as faceapi from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

import { useDispatch } from "react-redux";
import { getFaceStatus } from "../data";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();

  const runFacemesh = async () => {
    const net = await facemesh.load();
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      const detections = await net.estimateFaces(video);
      try {
        if (detections[0].faceInViewConfidence < 0.9) {
          dispatch(
            getFaceStatus(
              "Menggunakan masker",
              ((1 - detections[0].faceInViewConfidence) * 100).toFixed(2)
            )
          );
        } else {
          dispatch(
            getFaceStatus(
              "Tidak menggunakan masker",
              (detections[0].faceInViewConfidence * 100).toFixed(2)
            )
          );
        }
      } catch (e) {
        console.log("error");
      }
    }
  };

  runFacemesh();

  return (
    <Webcam
      audio={false}
      height={videoConstraints.height}
      width={videoConstraints.width}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
  );
};

export default WebcamCapture;

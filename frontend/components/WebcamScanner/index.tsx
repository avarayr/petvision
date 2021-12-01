import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-converter";
import * as tf from "@tensorflow/tfjs-core";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useSettings } from "../../contexts/Settings";
import useDebounce from "../../hooks/useDebounce";
import HintText from "../HintText";
import useEmbeddedAPI from "../../hooks/useEmbeddedAPI";

function WebcamScanner({ isScanning }: { isScanning: boolean }) {
  const [detectedClass, setDetectedClass] = useState("");
  const [lastDetectedDebouncedClass, setLastDetectedDebouncedClass] =
    useState("");
  const debouncedDetectedClass = useDebounce(detectedClass, 500);
  const [cocoModel, setCocoModel] = useState<cocoSsd.ObjectDetection | null>(
    null
  );

  const targetClass = "cat";

  const { camera, setCamera } = useSettings();
  const { sendONRequest } = useEmbeddedAPI();

  // set the lastDetectedDebouncedClass to the detectedClass
  useEffect(() => {
    if (debouncedDetectedClass !== lastDetectedDebouncedClass) {
      setLastDetectedDebouncedClass(debouncedDetectedClass);
      if (debouncedDetectedClass === targetClass) {
        sendONRequest();
        // we will rely on the device to automatically turn off
        // embedded contains a safety mechanism to prevent the
        // device from staying on indefinitely
      }
    }
  }, [debouncedDetectedClass]);

  useEffect(() => {
    const localCamera = localStorage.getItem("camera");
    if (localCamera) {
      setCamera(JSON.parse(localCamera));
    }
  }, [setCamera]);

  const webcamRef = useRef(null);

  const importCocoSsdModel = async () => {
    await tf.setBackend("webgl");
    setCocoModel(await cocoSsd.load());
  };

  const callPredict = (timeout = 500) => {
    setTimeout(predictWebcam, timeout);
  };

  const predictWebcam = (event: any) => {
    if (!webcamRef.current || !cocoModel) return;

    cocoModel
      .detect((webcamRef.current as any).video)
      .then((predictions: any[]) => {
        if (!predictions.length) {
          setDetectedClass("");
          callPredict();
          return;
        }
        const { class: label, score } = predictions[0];
        setDetectedClass(label);
        isScanning && callPredict();
      })
      .catch(() => {
        setDetectedClass("");
        callPredict();
      });
  };

  useEffect(() => {
    importCocoSsdModel();
  }, []);

  return (
    <>
      {isScanning ? (
        <>
          <AnimatePresence>
            {debouncedDetectedClass != "" && (
              <motion.div
                className="detected-class"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  marginBottom: "1rem",
                  position: "absolute",
                  background: "white",
                  padding: "0 50px",
                  color: "black",
                }}
              >
                <h1>{debouncedDetectedClass}</h1>
              </motion.div>
            )}
          </AnimatePresence>

          <Webcam
            audio={false}
            height={500}
            width={500}
            onLoadedData={predictWebcam}
            ref={webcamRef}
            videoConstraints={{
              deviceId: camera.deviceId,
              facingMode: camera.facingMode,
            }}
          />
        </>
      ) : (
        <HintText>Tap to start scanning for 🐱</HintText>
      )}
    </>
  );
}

export default WebcamScanner;

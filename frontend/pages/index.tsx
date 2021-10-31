import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import React from "react";
import Webcam from "react-webcam";
import Button from "../components/Button";
import Container from "../components/Container";
import HintText from "../components/HintText";
import PauseIcon from "../components/Icons/PauseIcon";
import RightTriangle from "../components/Icons/RightTriangle";
import * as mobilenet from "@tensorflow-models/mobilenet";

const Home: NextPage = () => {
  const [isScanning, setIsScanning] = React.useState(false);

  const handleScanButtonClick = () => {
    setIsScanning(!isScanning);
  };
  const videoConstraints = {
    facingMode: "user",
  };
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
  };

  return (
    <div>
      <Container>
        {isScanning ? (
          <Webcam
            audio={false}
            height={500}
            width={500}
            videoConstraints={videoConstraints}
          />
        ) : (
          <HintText>Tap to start scanning for 🐱</HintText>
        )}
        <div id="root"></div>
        <Button onClick={handleScanButtonClick}>
          <AnimatePresence>
            <motion.div layout>
              {isScanning ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PauseIcon />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <RightTriangle />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </Container>
    </div>
  );
};

export default Home;

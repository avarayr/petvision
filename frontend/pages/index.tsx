import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import React from "react";
import Webcam from "react-webcam";
import Button from "../components/Button";
import Container from "../components/Container";
import HintText from "../components/HintText";
import HStack from "../components/HStack";
import CogIcon from "../components/Icons/CogIcon";
import PauseIcon from "../components/Icons/PauseIcon";
import RightTriangle from "../components/Icons/RightTriangle";
import SettingsMenu from "../components/SettingsMenu";
import { useSettings } from "../contexts/Settings";

const Home: NextPage = () => {
  const [isScanning, setIsScanning] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  const handleScanButtonClick = () => {
    setIsScanning(!isScanning);
  };

  const handleSettingsButtonClick = () => {
    setShowSettings(!showSettings);
  };

  const { camera, setCamera } = useSettings();
  const webcamRef = React.useRef(null);

  return (
    <div>
      <Container>
        {isScanning ? (
          <Webcam
            audio={false}
            height={500}
            width={500}
            ref={webcamRef}
            videoConstraints={{
              deviceId: camera.deviceId,
              facingMode: camera.facingMode,
            }}
          />
        ) : (
          <HintText>Tap to start scanning for 🐱</HintText>
        )}
        <div id="root"></div>
        <HStack>
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
          <Button
            onClick={handleSettingsButtonClick}
            style={{
              width: "70px",
              marginLeft: "15px",
              position: "relative",
            }}
          >
            {showSettings && <SettingsMenu />}

            <CogIcon color="rgba(0,0,0,.8)" />
          </Button>
        </HStack>
      </Container>
    </div>
  );
};

export default Home;

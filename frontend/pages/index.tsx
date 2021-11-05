import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import HStack from "../components/HStack";
import CogIcon from "../components/Icons/CogIcon";
import PauseIcon from "../components/Icons/PauseIcon";
import RightTriangle from "../components/Icons/RightTriangle";
import SettingsMenu from "../components/SettingsMenu";
import WebcamScanner from "../components/WebcamScanner";

const Home: NextPage = () => {
  const handleScanButtonClick = () => {
    setIsScanning(!isScanning);
  };

  const handleSettingsButtonClick = () => {
    setShowSettings(!showSettings);
  };

  const [isScanning, setIsScanning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Head>
        <title>Petvision</title>
      </Head>
      <div>
        <Container>
          <WebcamScanner isScanning={isScanning} />
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
    </>
  );
};

export default Home;

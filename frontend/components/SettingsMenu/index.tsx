import { motion } from "framer-motion";
import React from "react";
import { CSSProperties } from "styled-components";
import { useSettings } from "../../contexts/Settings";
import useMediaDevices from "../../hooks/useMediaDevices";
import NoSSR from "../NoSSR";

function SettingsMenu() {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: "-30px",
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  const settingsBoxStyle = {
    position: "absolute",
    width: "300px",
    height: "150px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.4)",
    top: "-160px",
    left: "calc(-150px)",
  } as CSSProperties;

  const handleBoxClick = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    return false;
  };

  const { devices } = useMediaDevices();
  const { camera, setCamera } = useSettings();

  const changeCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCamera({ ...camera, deviceId: e.target.value });
  };

  const switchCameraFacing = () => {
    setCamera({
      ...camera,
      facingMode: camera.facingMode === "user" ? "environment" : "user",
    });
  };

  return (
    <NoSSR>
      <motion.div
        onClick={handleBoxClick}
        onTouchStart={handleBoxClick}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={settingsBoxStyle}
      >
        <p>Settings</p>
        <select onChange={changeCamera}>
          {devices.map(({ deviceId: id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>

        <hr />

        <button style={{ marginTop: "10px" }}>Switch camera facing</button>
      </motion.div>
    </NoSSR>
  );
}

export default SettingsMenu;

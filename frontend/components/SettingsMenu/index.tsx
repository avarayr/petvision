import { motion } from "framer-motion";
import React, { useEffect } from "react";
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
    cursor: "auto",
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

  const saveToLocalStorage = (data: any) => {
    localStorage.setItem("camera", JSON.stringify(data));
  };

  const changeCamera = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = { ...camera, deviceId: e.target.value };
    setCamera(data);
    saveToLocalStorage(data);
  };

  const switchCameraFacing = () => {
    const data = {
      ...camera,
      facingMode: camera.facingMode === "user" ? "environment" : "user",
    };
    setCamera(data);
    saveToLocalStorage(data);
  };

  useEffect(() => {
    // get camera from local storage
    const cameraFromLocalStorage = localStorage.getItem("camera");
    if (cameraFromLocalStorage) {
      setCamera(JSON.parse(cameraFromLocalStorage));
    }
  }, [setCamera]);

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
        <select onChange={changeCamera} value={camera.deviceId}>
          {devices.map(({ deviceId: id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>

        <hr />

        <div
          style={{
            marginTop: "10px",
            background: "#ddd",
            padding: "10px",
            borderRadius: "10px",
            width: "200px",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={switchCameraFacing}
        >
          Switch camera facing
        </div>
      </motion.div>
    </NoSSR>
  );
}

export default SettingsMenu;

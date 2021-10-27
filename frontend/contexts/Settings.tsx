import { createContext, useContext, useState } from "react";

interface ICamera {
  facingMode: string;
  deviceId: string;
}

const SettingsContext = createContext({
  camera: {
    facingMode: "user",
    deviceId: "",
  } as ICamera,
  setCamera: (camera: ICamera) => {},
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [camera, setCamera] = useState({
    facingMode: "user",
    deviceId: "",
  } as ICamera);
  return (
    <SettingsContext.Provider value={{ camera, setCamera }}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  return useContext(SettingsContext);
}

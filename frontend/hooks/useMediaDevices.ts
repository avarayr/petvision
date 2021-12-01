import React from "react";

const useMediaDevices = () => {
  const [devices, setDevices] = React.useState([]);
  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(
        mediaDevices.filter(
          ({ kind }: { kind: string }) => kind === "videoinput"
        )
      ),
    [setDevices]
  );
  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return {
    devices,
  };
};

export default useMediaDevices;

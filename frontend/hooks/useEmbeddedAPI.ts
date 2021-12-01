const useEmbeddedAPI = () => {
  const apiURL = process.env.NEXT_PUBLIC_EMBEDDED_API_URL;
  if (!apiURL) {
    throw new Error(
      "No embedded API URL provided. Please set the 'NEXT_PUBLIC_EMBEDDED_API_URL' environment variable in the .env.local. Follow the README for instructions."
    );
  }

  const onEndpoint = "/on";
  const offEndpoint = "/off";

  const sendONRequest = async () => {
    return fetch(`${apiURL}${onEndpoint}`, {
      cache: "no-cache",
    });
  };

  const sendOFFRequest = async () => {
    return fetch(`${apiURL}${offEndpoint}`, {
      cache: "no-cache",
    });
  };

  return {
    sendONRequest,
    sendOFFRequest,
  };
};

export default useEmbeddedAPI;

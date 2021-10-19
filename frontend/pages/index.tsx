import type { NextPage } from "next";
import React from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import HintText from "../components/HintText";
import PauseIcon from "../components/Icons/PauseIcon";
import RightTriangle from "../components/Icons/RightTriangle";

const Home: NextPage = () => {
  const [isScanning, setIsScanning] = React.useState(false);

  const handleScanButtonClick = () => {
    setIsScanning(!isScanning);
  };

  return (
    <div>
      <Container>
        <HintText>Tap to start scanning for 🐱</HintText>
        <Button onClick={handleScanButtonClick}>
          {isScanning ? <PauseIcon /> : <RightTriangle />}
        </Button>
      </Container>
    </div>
  );
};

export default Home;

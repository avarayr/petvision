import type { NextPage } from "next";
import React from "react";
import Button from "../components/button";

const Home: NextPage = () => {
  const ClickMe = () => {
    console.log("button was clicked");
  };
  return (
    <div>
      {/* this isn't working for me.. <h1 className="header"> Home Page </h1> */}
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Georgia",
        }}
      >
        Home Page
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Georgia",
          height: "85vh",
        }}
      >
        <Button onClick={ClickMe}> Tap to start scanning 🐈 </Button>
      </div>
    </div>
  );
};

export default Home;

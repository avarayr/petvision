import type { NextPage } from "next";
import React from "react";
import Button from "../components/button";
import Container from "../components/Container";

const Home: NextPage = () => {
  const clickMe = () => {
    console.log("button was clicked");
  };
  return (
    <div>
      <Container>
        <h1>Hello Next.js</h1>
        <Button onClick={clickMe}>Click me</Button>
      </Container>
    </div>
  );
};

export default Home;

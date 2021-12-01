import { NextPage } from "next";

function About() {
  return (
    <div>
      <h1>
        <u>CS 530 Group 3 Project: Petvision</u>
      </h1>
      <hr style={{}}></hr>
      <h2>
        <u>Group Members</u>
      </h2>
      <ul>
        <li>Mika</li>
        <li>Nicolas</li>
        <li>Patricia</li>
      </ul>
      <h2>
        <u>About the Project</u>
      </h2>
      <p>
        Project Petvision is a webbased application that tracks whether or not
        an animal - a pet in this case - is on screen via webcam. We are able to
        track if it is on screen through machine learning.The purpose of this
        project is to train pets from passing certain areas on screen; if they
        are detected via the webcam/ML, the project will be notified to
        condition the pet by spraying them with a tiny bit of water.
      </p>
      <h2
        style={{
          color: "blue",
        }}
      >
        <a href="http://localhost:3000">
          <u>Link to Page</u>
        </a>
      </h2>
    </div>
  );
}

export default About;

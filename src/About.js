import React from "react";
import styled from "styled-components";
import Backdrop from "./styles/Backdrop"


const Wrapper = styled.div`
    height:100vh
    width:80%;
`;

const Title = styled.h1`
  color: #e6ffff;
  text-align: center;
  font-size: 3vw;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  margin:0;
`;
const Main = styled.p`
  color: #e6ffff;
  text-align: center;
  font-size: 12px;
  font-size: 1.5vw;
  font-family: "Roboto", sans-serif;
`;

const exampleText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
   when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
   It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
    including versions of Lorem Ipsum.`;

function About() {
  return (
    <Wrapper  id="about">
      <Backdrop linearGradient={"#ff006c,#1f331f"} >
        <Title>What is Lorem Ipsum?</Title>

        <Main>{exampleText}</Main>
      </Backdrop>
      </Wrapper>
  );
}

export default About;

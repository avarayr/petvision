import React from "react";
import styled from "styled-components";

interface OnButtonClick {
  children?: React.ReactNode;
  props?: any;
  onClick?: any;
}

const Button: React.FC<OnButtonClick> = ({ onClick, children, ...props }) => {
  return (
    <ButtonStyles {...props} onClick={onClick}>
      {children}
    </ButtonStyles>
  );
};

export default Button;

const ButtonStyles = styled.button``;

import React from 'react';
import styled from 'styled-components';

const LoginBtnOnLoginPage = ({ text }: { text: string }) => {
  return (
    <StyledWrapper>
          <button>
          {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-size: 18px;
    color: #e1e1e1;
    font-family: inherit;
    font-weight: 800;
    cursor: pointer;
    position: relative;
    border: none;
    background: none;
    text-transform: uppercase;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: color;
  }

  button:focus,
  button:hover {
    color: #fff;
  }

  button:focus:after,
  button:hover:after {
    width: 100%;
    left: 0%;
  }

  button:after {
    content: "";
    pointer-events: none;
    bottom: -2px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: #fff;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
  }`;

export default LoginBtnOnLoginPage
import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

// interface ContainerProps {
//     fullscreen: boolean;
//     height?: string;
// }
//
// interface Props extends Partial<ContainerProps> {
//     size?: SizeProp;
// }

export const Spinner = ({ height, fullscreen = true, size = "6x" }) => (
  <Container fullscreen={fullscreen} height={height}>
    <IconStyled spin icon={faCircleNotch} size={size} />
  </Container>
);

const Container = styled.section`
  ${({ fullscreen, height }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${height || (fullscreen ? "100%" : " calc(100% - 90px)")};
    opacity: 90%;
  `}
`;

const IconStyled = styled(FontAwesomeIcon)`
  color: #000;
`;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import { ImgBackground } from "../../images";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const Register = () => {
  return (
    <Container imgBackground={ImgBackground}>
      <div className="background-section"></div>
      <div className="form-section">
        <div className="title-item">
          <Link to="/">
            <h1>AnimeFlix</h1>
          </Link>
          <h2>
            <Link to="/login">
              <FontAwesomeIcon icon={faArrowLeft} className="item-icon" />
              <span>Login</span>
            </Link>
          </h2>
        </div>
        <div className="form-item">
          <h2>Bienvenido</h2>
          <Form>
            <Input label="Nombres" required placeHolder="Ingrese nombres" />
            <Input label="Apellidos" required placeHolder="Ingrese apellidos" />
            <Input label="Teléfono" required placeHolder="Ingrese teléfono" />
            <Input label="Email" required placeHolder="Ingrese email" />
            <InputPassword
              label="Contraseña"
              required
              placeHolder="Ingrese contraseña"
            />
            <InputPassword
              label="Repetir contraseña"
              required
              placeHolder="Repetir contraseña"
            />
            <Button block>Iniciar sesión</Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  background: #161616;
  width: 100%;
  height: 100%;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  ${mediaQuery.minTablet} {
    grid-template-columns: 60% 1fr;
  }
  .background-section {
    background-blend-mode: multiply;
    background-image: url(${({ imgBackground }) => imgBackground});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    background-attachment: scroll;
    width: 100%;
  }
  .title-item {
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 1.8rem;
    }
    a {
      color: #fff;
      text-decoration: none;
      span {
        margin-left: 0.3rem;
        font-size: 1.4rem;
      }
    }
  }
  .form-item {
    padding-top: 4rem;
    width: 90%;
    margin: 0 auto;
    h2 {
      font-size: 2rem;
      text-align: center;
      padding-bottom: 2rem;
    }
  }
`;

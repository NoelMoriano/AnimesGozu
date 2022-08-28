import styled from "styled-components";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import { ImgBackground } from "../../images";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../providers/Authentication";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate();

  const { authUser, registerAuthUser, loginLoading } = useAuthentication();

  const { register, handleSubmit } = useForm();

  const onChangeAuthUser = () => navigate("/");

  useMemo(() => {
    authUser && onChangeAuthUser(authUser);
  }, [authUser]);

  const onSubmitRegister = ({ email, password }) =>
    registerAuthUser(email, password);

  return (
    <Container imgBackground={ImgBackground}>
      <div className="background-section"></div>
      <div className="form-section">
        <div className="title-item">
          <h2>
            <Link to="/login">
              <FontAwesomeIcon icon={faArrowLeft} className="item-icon" />
              <span>Login</span>
            </Link>
          </h2>
        </div>
        <div className="form-item">
          <h2>Bienvenido</h2>
          <Form onSubmit={handleSubmit(onSubmitRegister)}>
            <Input
              label="Nombres"
              required
              placeHolder="Ingrese nombres"
              register={{ ...register("firstName") }}
            />
            <Input
              label="Apellidos"
              required
              placeHolder="Ingrese apellidos"
              register={{ ...register("lastName") }}
            />
            <Input
              label="Teléfono"
              required
              placeHolder="Ingrese teléfono"
              register={{ ...register("phoneNumber") }}
            />
            <Input
              label="Email"
              type="email"
              required
              placeHolder="Ingrese email"
              register={{ ...register("email") }}
            />
            <InputPassword
              label="Contraseña"
              required
              placeHolder="Ingrese contraseña"
              register={{ ...register("password") }}
            />

            <Button block loading={loginLoading} disabled={loginLoading}>
              Iniciar sesión
            </Button>
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
  min-height: 100vh;
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
    padding: 1rem;
    display: flex;
    justify-content: end;
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
    padding-top: 1rem;
    width: 90%;
    margin: 0 auto;
    h2 {
      font-size: 2rem;
      text-align: center;
      padding-bottom: 2rem;
    }
  }
`;

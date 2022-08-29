import styled from "styled-components";
import { Link } from "react-router-dom";
import { faArrowLeft, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import { ImgBackground } from "../../images";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../providers/Authentication";
import { useNavigate } from "react-router";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export const Register = () => {
  const navigate = useNavigate();

  const { authUser, registerAuthUser, loginWithGoogle, loginLoading } =
    useAuthentication();

  const { register, handleSubmit } = useForm();

  const onChangeAuthUser = () => navigate("/");

  useMemo(() => {
    authUser && onChangeAuthUser(authUser);
  }, [authUser]);

  const registerGoogle = () => loginWithGoogle();

  const onSubmitRegister = ({ email, password }) =>
    registerAuthUser(email, password);

  return (
    <Container imgBackground={ImgBackground}>
      <div className="background-section" />
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

            <Button
              block
              loading={loginLoading}
              disabled={loginLoading}
              margin="0"
              htmlType="submit"
            >
              <div className="content-button">
                <FontAwesomeIcon icon={faSignIn} className="item-icon" />
                Registrarme
              </div>
            </Button>
            <Button
              block
              disabled={loginLoading}
              margin=".2em 0 0 0"
              onClick={registerGoogle}
            >
              <div className="content-button">
                <FontAwesomeIcon icon={faGoogle} className="item-icon" />
                Registrarme con Google
              </div>
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
  padding: 1em 0;
  ${mediaQuery.minTablet} {
    grid-template-columns: 60% 1fr;
    padding-bottom: 0;
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
    padding: 0.4rem;
    width: 90%;
    margin: 0 auto;
    h2 {
      font-size: 2rem;
      text-align: center;
      padding-bottom: 1rem;
    }
    .content-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8em;
      .item-icon {
        margin-right: 0.5em;
        font-size: 1.5em;
      }
    }
  }
`;

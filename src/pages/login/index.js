import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../providers/Authentication";
import { useNavigate } from "react-router";
import { BgLogin } from "../../images";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export const Login = () => {
  const navigate = useNavigate();

  const { authUser, login, loginLoading } = useAuthentication();

  const onChangeAuthUser = () => navigate("/");

  useMemo(() => {
    authUser && onChangeAuthUser(authUser);
  }, [authUser]);

  const { register, handleSubmit } = useForm();

  const onSubmitLogin = ({ email, password }) => login(email, password);

  return (
    <Container BgLogin={BgLogin}>
      <div className="wrapper-login">
        <h1>AnimeGozu</h1>
        <Form onSubmit={handleSubmit(onSubmitLogin)}>
          <Input
            label="Usuario"
            required
            placeHolder="Ingrese usuario"
            register={{ ...register("email") }}
          />
          <InputPassword
            label="Contraseña"
            required
            placeHolder="Ingrese usuario"
            register={{ ...register("password") }}
          />

          <Button
            block
            loading={loginLoading}
            disabled={loginLoading}
            margin={0}
          >
            <div className="content-button">Iniciar sesión</div>
          </Button>
          <Button
            block
            loading={loginLoading}
            disabled={loginLoading}
            margin={0}
          >
            <div className="content-button">
              <FontAwesomeIcon
                icon={faGoogle}
                size="1x"
                className="item-icon"
              />
              Iniciar sesión con Google
            </div>
          </Button>
        </Form>

        {/*        <div className="item-text">
          <span className="item-link">Registrarse</span>
        </div>

        <div className="footer-card">
          <div className="left-wrapper">
            <Button type="tertiary" block>
              Google
            </Button>
          </div>
          <div className="center-wrapper">O</div>
          <div className="right-wrapper">
            <Button type="tertiary" block>
              Facebook
            </Button>
          </div>
        </div>*/}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-blend-mode: multiply;
  background: url(${({ BgLogin }) => BgLogin}),
    linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  background-size: cover;
  background-repeat: no-repeat;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  .wrapper-login {
    width: 38em;
    height: auto;
    padding: 1.7rem;
    border-radius: 1em;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    h1 {
      margin-bottom: 1em;
      text-align: center;
    }
    .item-text {
      text-align: left;
      margin: 1em auto;
    }
    .content-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9em;
      .item-icon {
        margin-right: 0.7em;
        font-size: 1.1em;
      }
    }
    .footer-card {
      display: grid;
      grid-template-columns: 1fr 2em 1fr;
      .center-wrapper {
        margin: auto 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

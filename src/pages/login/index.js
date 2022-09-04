import React, { useEffect, useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthentication } from "../../providers";
import { useNavigate } from "react-router";
import { BgLogin, ImgLogoAnimeGozu } from "../../images";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useFormUtils } from "../../hooks";

export const Login = () => {
  const navigate = useNavigate();

  const { authUser, login, loginWithGoogle, loginLoading, googleLoginLoading } =
    useAuthentication();

  const onNavigateTo = (url) => navigate(url);

  useMemo(() => {
    authUser && onNavigateTo("/");
  }, [authUser]);

  useEffect(() => {
    console.log("loginLoading->", loginLoading);
  }, [loginLoading]);

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const googleLogin = () => loginWithGoogle();

  const onSubmitLogin = ({ email, password }) => login(email, password);

  return (
    <Container BgLogin={BgLogin}>
      <div className="wrapper-login">
        <div className="wrapper-logo">
          <img
            src={ImgLogoAnimeGozu}
            alt="Anime Gozu"
            onClick={() => onNavigateTo("/")}
          />
        </div>
        <Form onSubmit={handleSubmit(onSubmitLogin)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Usuario"
                placeHolder="Ingrese usuario"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <InputPassword
                label="Contraseña"
                placeHolder="Ingrese usuario"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
              />
            )}
          />
          <div className="link-wrapper">
            <Link to="/register">Registrarme</Link>
          </div>
          <Button
            block
            loading={loginLoading}
            disabled={loginLoading || googleLoginLoading}
            margin="0"
            htmlType="submit"
          >
            <div className="content-button">
              <FontAwesomeIcon icon={faSignIn} className="item-icon" />
              Iniciar sesión
            </div>
          </Button>
          <Button
            block
            loading={googleLoginLoading}
            disabled={loginLoading || googleLoginLoading}
            margin=".2em 0 0 0"
            onClick={() => googleLogin()}
          >
            <div className="content-button">
              <FontAwesomeIcon icon={faGoogle} className="item-icon" />
              Continuar con Google
            </div>
          </Button>
        </Form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-blend-mode: multiply;
  background-image: url(${({ BgLogin }) => BgLogin}),
    linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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
    color: ${({ theme }) => theme.colors.font1};
    margin: 1em;

    .wrapper-logo {
      text-align: center;
      img {
        width: 60%;
        margin-bottom: 1em;
      }
    }

    h1 {
      margin-bottom: 1em;
      text-align: center;
    }
    .item-text {
      text-align: left;
      margin: 1em auto;
    }

    .link-wrapper {
      width: 100%;
      margin: 0.7em 0;
      text-align: left;
      a {
        color: ${({ theme }) => theme.colors.quinary};
      }
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

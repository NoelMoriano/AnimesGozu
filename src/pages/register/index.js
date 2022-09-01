import styled from "styled-components";
import { Link } from "react-router-dom";
import { faArrowLeft, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import { ImgBackground } from "../../images";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { Controller, useForm } from "react-hook-form";
import { useAuthentication } from "../../providers/Authentication";
import { useNavigate } from "react-router";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import { assign, toNumber } from "lodash";

export const Register = () => {
  const navigate = useNavigate();

  const {
    authUser,
    registerAuthUser,
    loginWithGoogle,
    loginLoading,
    googleLoginLoading,
  } = useAuthentication();

  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onNavigateTo = (param) => navigate(param);

  useMemo(() => {
    authUser && onNavigateTo("/");
  }, [authUser]);

  const registerGoogle = () => loginWithGoogle();

  const onSubmitRegister = (formData) => registerAuthUser(mapUser(formData));

  const mapUser = (formData) =>
    assign(
      {},
      {
        firstName: formData.firstName.toLowerCase(),
        lastName: formData.lastName.toLowerCase(),
        phone: {
          countryCode: "+51",
          number: toNumber(formData.phoneNumber),
        },
        email: formData.email.toLowerCase(),
        password: formData.password,
      }
    );

  return (
    <Container imgBackground={ImgBackground}>
      <div className="background-section" />
      <div className="form-section">
        <div className="title-item">
          <Link to="/login">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="item-icon"
              size="lg"
            />
            <span>Login</span>
          </Link>
        </div>
        <div className="form-item">
          <h2>Bienvenido</h2>
          <Form onSubmit={handleSubmit(onSubmitRegister)}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nombres"
                  placeHolder="Ingrese nombres"
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
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Apellidos"
                  placeHolder="Ingrese apellidos"
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
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Teléfono"
                  type="number"
                  placeHolder="Ingrese teléfono"
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
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Email"
                  placeHolder="Ingrese email"
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
            <Button
              block
              loading={loginLoading}
              disabled={loginLoading || googleLoginLoading}
              margin=".5em 0 0 0"
              htmlType="submit"
            >
              <div className="content-button">
                <FontAwesomeIcon icon={faSignIn} className="item-icon" />
                Registrarme
              </div>
            </Button>
            <Button
              block
              loading={googleLoginLoading}
              disabled={loginLoading || googleLoginLoading}
              margin=".2em 0 0 0"
              onClick={() => registerGoogle()}
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
  ${mediaQuery.minTablet} {
    grid-template-columns: 55% 1fr;
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
    display: none;
    ${mediaQuery.minTablet} {
      display: inherit;
    }
  }
  .title-item {
    padding: 1rem;
    display: flex;
    justify-content: end;
    font-size: 1.5em;
    a {
      color: #fff;
      text-decoration: none;
      span {
        margin-left: 0.3rem;
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

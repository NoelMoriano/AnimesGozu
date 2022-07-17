import React from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import styled from "styled-components";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="wrapper-login">
        <h1>AnimeGozu</h1>
        <Form>
          <Input label="Usuario" required placeHolder="Ingrese usuario" />
          <InputPassword
            label="Contraseña"
            required
            placeHolder="Ingrese usuario"
          />

          <Button block onClick={() => navigate("/")}>
            Iniciar sesión
          </Button>
        </Form>

        <div className="item-text">
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
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-blend-mode: multiply;
  background: url(https://noelmoriano.github.io/anime-flix/images/resources/bg1.gif),
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
    h1 {
      margin-bottom: 1em;
      text-align: center;
    }
    .item-text {
      text-align: left;
      margin: 1em auto;
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

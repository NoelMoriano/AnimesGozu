import React from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import styled from "styled-components";

export const Login = () => {
  return (
    <Container>
      <h1>Login</h1>
      <Form>
        <Input label="Usuario" required placeHolder="Ingrese usuario" />
        <InputPassword
          label="Contraseña"
          required
          placeHolder="Ingrese usuario"
        />

        <Button>Iniciar sesión</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

import React from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Form } from "./Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useFormUtils } from "../../hooks";
import { TextArea } from "./TextArea";

export const FormAnimeRequest = ({ onCloseModal }) => {
  const schema = yup.object({
    name: yup.string().required(),
    linkReference: yup.string(),
    feedback: yup.string(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmitSendAnimeRequest = (formData) => {
    console.log("formData->", formData);
    onCloseModal();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmitSendAnimeRequest)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              label="Nombre del anime"
              placeHolder="Ingrese el nombre del anime"
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
          name="linkReference"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <Input
              label="Link de referencia"
              placeHolder="Ingrese el link de referencia"
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
          name="feedback"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, name } }) => (
            <TextArea
              label="Alguna sugerencia para poder seguir mejorando?"
              placeHolder="Ingrese feedback"
              onChange={onChange}
              value={value}
              name={name}
              error={error(name)}
              helperText={errorMessage(name)}
              required={required(name)}
            />
          )}
        />
        <Button block margin=".5em 0 0 0" size="medium" htmlType="submit">
          <div className="content-button">
            <FontAwesomeIcon icon={faEnvelope} className="item-icon" />
            Enviar solicitud de mi anime
          </div>
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  .content-button {
  }
`;

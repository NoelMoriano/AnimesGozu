import styled from "styled-components";
import { Button, Form, InputPassword } from "../ui";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const PasswordForm = () => {
  const schema = yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmitChangePassword = (formData) =>
    console.log("formData->", formData);

  return (
    <Container>
      <div className="form-section">
        <div className="form-item">
          <Form onSubmit={handleSubmit(onSubmitChangePassword)}>
            <Controller
              name="oldPassword"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <InputPassword
                  label="Antigua contraseña"
                  placeHolder="Ingrese antigua contraseña"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  visiblePassword={true}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <InputPassword
                  label="Nueva contraseña"
                  placeHolder="Ingrese nueva contraseña"
                  value={value}
                  onChange={onChange}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Button htmlType="submit" block>
              Actualizar
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  .form-item {
    padding: 3em 0;
    width: 90%;
    margin: 0 auto;
    ${mediaQuery.minTablet} {
      padding: 3em 8em;
    }
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

import styled from "styled-components";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Form, Input, Spinner } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { useAuthentication } from "../../providers";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAsync, useDefaultFirestoreProps, useFormUtils } from "../../hooks";
import { assign, toNumber } from "lodash";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const Profile = () => {
  const navigate = useNavigate();

  const { authUser } = useAuthentication();
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const [userSnapshot, loadingUser, errorUser] = useDocumentData(
    authUser ? firestore.collection("users").doc(authUser.id) : null
  );

  useEffect(() => {
    if (errorUser) {
      alert("Error al obtener datos de usuario!");
      return onNavigateTo("/");
    }
  }, [errorUser]);

  const [onSaveUser, loadingSaveUser, errorSaveUser] = useAsync(
    async (user) => {
      if (!user.id)
        return alert("Error al guardar datos, intentelo mas tarde!");

      await firestore
        .collection("users")
        .doc(user.id)
        .set(assignUpdateProps(user), { merge: true });
    }
  );

  const schema = yup.object({
    nickName: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().required().email(),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onNavigateTo = (param) => navigate(param);

  const mapUser = (formData) =>
    assign(
      {},
      {
        id: authUser.id,
        nickName: formData.nickName,
        firstName: formData.firstName.toLowerCase(),
        lastName: formData.lastName.toLowerCase(),
        phone: {
          countryCode: "+51",
          number: toNumber(formData.phoneNumber),
        },
        email: formData.email.toLowerCase(),
      }
    );

  useEffect(() => {
    reset({
      nickName: userSnapshot?.nickName || "",
      firstName: userSnapshot?.firstName || "",
      lastName: userSnapshot?.lastName || "",
      phoneNumber: userSnapshot?.phone.number || "",
      email: userSnapshot?.email || "",
    });
  }, [userSnapshot]);

  const onSubmitRegister = (formData) => onSaveUser(mapUser(formData));

  useEffect(() => {
    errorSaveUser &&
      alert(
        "Error al guardar datos, intentelo mas tarde, o comuniquese con soporte!"
      );
  }, [errorSaveUser]);

  if (loadingUser) return <Spinner fullscreen />;

  return (
    <Container>
      <div className="form-section">
        <div className="form-item">
          <Form onSubmit={handleSubmit(onSubmitRegister)}>
            <Controller
              name="nickName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nick name"
                  placeHolder="Ingrese nick name"
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
            <Button
              block
              loading={loadingSaveUser}
              margin=".5em 0 0 0"
              htmlType="submit"
            >
              <div className="content-button">
                <FontAwesomeIcon icon={faSave} className="item-icon" />
                Guardar
              </div>
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;
  color: #fff;

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

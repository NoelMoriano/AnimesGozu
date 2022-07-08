import styled from "styled-components";
import { MenuList } from "./MenuList";
import { Button } from "../ui";

export const NavbarList = () => {
  return (
    <Container>
      <MenuList title="Inicio" linkTo="./" />
      <MenuList title="Animes" linkTo="./" />
      <MenuList title="En Emisión" linkTo="./" />
      <div className="wrapper-buttons">
        <Button size="medium">Iniciar sesion</Button>
        <Button size="medium" type="tertiary">
          Registrarse
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;
  .wrapper-buttons {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

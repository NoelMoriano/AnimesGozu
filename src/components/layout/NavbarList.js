import styled from "styled-components";
import { MenuList } from "./MenuList";
import { Button } from "../ui";
import { useNavigate } from "react-router";

export const NavbarList = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <MenuList title="Inicio" linkTo="./" />
      <MenuList title="Animes" linkTo="./" />
      <MenuList title="En Emisión" linkTo="./" />
      <div className="wrapper-buttons">
        <Button size="medium" onClick={() => navigate("/login")}>
          Iniciar sesion
        </Button>
        <Button
          size="medium"
          type="tertiary"
          onClick={() => navigate("/register")}
        >
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

import styled from "styled-components";

export const NavbarList = () => {
  return (
    <Container>
      <ul>
        <li>Series</li>
        <li>Peliculas</li>
        <li>Mi Lista</li>
        <li>Cerrar Sesión</li>
      </ul>
    </Container>
  );
};

const Container = styled.div``;

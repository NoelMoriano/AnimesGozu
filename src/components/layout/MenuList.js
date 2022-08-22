import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuList = ({ linkTo, title, onClick }) => (
  <Container onClick={onClick}>
    <Link to={linkTo} className="link-section">
      <h3>{title}</h3>
    </Link>
  </Container>
);

const Container = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.6rem 0;
  .link-section {
    text-decoration: none;
    text-transform: uppercase;
    color: #fff;
    font-size: 0.9rem;
  }
`;

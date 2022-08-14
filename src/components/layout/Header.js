import styled from "styled-components";
import { ImgLogo } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useNavigate } from "react-router";

export const Header = ({ onSetVisibleDrawer }) => {
  const navigate = useNavigate();

  const onNavigate = (url) => navigate(url);

  return (
    <Container>
      <div className="content-left">
        <img src={ImgLogo} alt="" onClick={() => onNavigate("/")} />
      </div>
      <div className="content-right">
        <InputSearch>
          <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="¿Que quieres ver hoy?"
            onClick={() => onNavigate("/search")}
          />
          <FontAwesomeIcon className="icon-clear" icon={faXmark} />
        </InputSearch>
        <div className="item-open-drawer">
          <FontAwesomeIcon
            className="icon-clear"
            icon={faBars}
            onClick={() => onSetVisibleDrawer(true)}
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr auto;
  background: ${({ theme }) => theme.colors.tertiary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.tertiary};
  box-sizing: border-box;
  z-index: 900;
  ${mediaQuery.minTablet} {
    grid-template-columns: 17em 1fr;
  }

  .content-left,
  .content-right {
    padding: 0.5em 1rem;
  }
  .content-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ${mediaQuery.minTablet} {
      justify-content: center;
    }
    img {
      width: auto;
      height: 2.2em;
      cursor: pointer;
    }
  }
  .content-right {
    ${mediaQuery.minTablet} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .item-open-drawer {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: ${({ theme }) => theme.colors.font1};
      font-size: ${({ theme }) => theme.font_sizes.xxx_large};
      ${mediaQuery.minTablet} {
        display: none;
      }
    }
  }
`;

const InputSearch = styled.div`
  display: none;
  align-items: center;
  max-width: 25em;
  width: 70%;
  color: ${({ theme }) => theme.colors.font1};
  background: ${({ theme }) => theme.colors.dark};
  border: ${({ theme }) => `2px solid ${theme.colors.quaternary}`};
  border-radius: 1em;
  padding: 0.5em;
  box-sizing: border-box;

  ${mediaQuery.minTablet} {
    display: grid;
    grid-template-columns: 7% 1fr 5%;
  }

  input {
    width: 100%;
    color: inherit;
    padding: 0.2em;
    background: transparent;
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.font_sizes.small};
  }

  .icon-search,
  .icon-clear {
    margin: auto;
  }

  .icon-clear {
    display: none;
  }

  input:focus ~ .icon-clear {
    display: flex;
  }
`;

import styled from "styled-components";
import { ImgLogoAnimeGozu } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useNavigate } from "react-router";
import { InputSearch } from "../ui";

export const Header = ({ onSetVisibleDrawer }) => {
  const navigate = useNavigate();

  const onNavigateTo = (url) => navigate(url);

  return (
    <Container>
      <div className="content-left">
        <img
          src={ImgLogoAnimeGozu}
          alt="Anime Gozu"
          onClick={() => onNavigateTo("/")}
        />
      </div>
      <div className="content-right">
        <InputSearch />
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
      height: 2.7em;
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

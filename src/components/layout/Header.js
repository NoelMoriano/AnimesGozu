import styled from "styled-components";
import { ImgLogoAnimeGozu } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { useNavigate } from "react-router";
import { Avatar, InputSearch } from "../ui";
import React from "react";
import { useAuthentication } from "../../providers";
import { useDevice } from "../../hooks";
import ReactGA from "react-ga4";

export const Header = ({ onSetVisibleDrawer }) => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const { authUser } = useAuthentication();

  const onNavigateTo = (url) => navigate(url);

  return (
    <Container>
      <div className="content-left">
        <img
          loading="lazy"
          src={ImgLogoAnimeGozu}
          alt="Animes Gozu"
          onClick={() => {
            ReactGA.event({
              category: "links",
              action: "click-link-logo-animes-gozu",
              label: "Click link logo animes gozu",
            });

            onNavigateTo("/");
          }}
        />
      </div>
      <div className="content-right">
        <div className="wrapper-search">
          <InputSearch />
        </div>
        <div className="item-avatar-contain">
          {authUser ? (
            <Avatar
              ImgAvatar={authUser.providerData?.photoURL}
              nickName={
                authUser?.nickName
                  ? authUser.nickName
                  : authUser?.firstName
                  ? authUser.firstName.split(" ")[0]
                  : null
              }
              onClick={() => {
                ReactGA.event({
                  category: "links",
                  action: "click-link-avatar-photo",
                  label: "Click link avatar photo",
                });

                return isMobile && onSetVisibleDrawer(true);
              }}
            />
          ) : (
            <div className="item-icon-open">
              <FontAwesomeIcon
                className="icon-clear"
                icon={faBars}
                onClick={() => {
                  ReactGA.event({
                    category: "links",
                    action: "click-link-open-menu-mobile",
                    label: "Click link open menu mobile",
                  });

                  return isMobile && onSetVisibleDrawer(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr auto;
  background: ${({ theme }) => theme.colors.tertiary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.tertiary};
  box-sizing: border-box;
  color: #fff;
  font-size: 13px;
  height: 57px;
  width: 100%;
  z-index: 900;
  ${mediaQuery.minDesktop} {
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
    ${mediaQuery.minDesktop} {
      justify-content: center;
    }
    img {
      width: auto;
      height: 2.3em;
      cursor: pointer;
      ${mediaQuery.minDesktop} {
        height: 2.5em;
      }
    }
  }
  .wrapper-search {
    display: none;
    ${mediaQuery.minDesktop} {
      display: flex;
      align-items: center;
    }
  }
  .content-right {
    ${mediaQuery.minDesktop} {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1em;
    }
    .item-avatar-contain {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: ${({ theme }) => theme.colors.font1};
      .item-icon-open {
        font-size: ${({ theme }) => theme.font_sizes.xxx_large};
        ${mediaQuery.minDesktop} {
          display: none;
        }
      }
    }
  }
`;

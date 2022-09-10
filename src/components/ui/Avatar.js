import React from "react";
import styled from "styled-components";
import { AvatarDefault } from "../../images";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const Avatar = ({ ImgAvatar, nickName = "User", onClick }) => {
  return (
    <Container onClick={onClick}>
      <div className="profile">
        <div className="name-profile">
          <h6>{nickName}</h6>
        </div>
        <div className="img-profile">
          <img
            src={ImgAvatar || AvatarDefault}
            alt="Avatar image"
            className="img-avatar"
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.font1};
  .profile {
    display: flex;
    align-items: center;
    justify-content: end;
    .img-avatar {
      width: 2.7em;
      height: 2.7em;
      object-fit: cover;
      border-radius: 50%;
      margin-left: 1em;
    }
    .name-profile {
      text-transform: capitalize;
      text-align: center;
    }
  }
`;

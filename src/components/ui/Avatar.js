import React from "react";
import styled from "styled-components";
import { AvatarDefault } from "../../images";

export const Avatar = ({ ImgAvatar, nickName = "User" }) => {
  return (
    <Container>
      <div className="profile">
        <div className="img-profile">
          <img
            src={ImgAvatar || AvatarDefault}
            alt="Avatar image"
            className="img-avatar"
          />
        </div>
        <div className="name-profile">
          <h5>{nickName}</h5>
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
    justify-content: center;
    flex-direction: column;
    .img-avatar {
      width: 6.5em;
      height: 6.5em;
      object-fit: cover;
      margin: 0.5rem 0;
      border-radius: 50%;
    }
    .name-profile {
      text-transform: capitalize;
      text-align: center;
    }
  }
`;

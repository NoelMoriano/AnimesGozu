import React from "react";
import styled from "styled-components";
import { ImgAvatar } from "../../images";

export const Avatar = () => (
  <Container>
    <div className="profile">
      <div className="img-profile">
        <img src={ImgAvatar} alt="Avatar image" className="img-avatar" />
      </div>
      <div className="name-profile">
        <h4>Fiona</h4>
      </div>
    </div>
  </Container>
);

const Container = styled.div`
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .img-avatar {
      width: 7rem;
      height: 7rem;
      -o-object-fit: cover;
      object-fit: cover;
      margin: 0.5rem 0;
      border-radius: 50%;
    }
  }
`;

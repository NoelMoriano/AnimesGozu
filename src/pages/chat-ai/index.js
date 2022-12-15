import React from "react";
import styled from "styled-components";

export const ChatAi = () => {
  return (
    <Container>
      <div className="content-banner">
        <iframe
          key="chat-ai"
          className="iframe-chat-ai"
          src="https://chat.openai.com/"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.font1};

  .content-banner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .iframe-chat-ai {
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 57px);
    }
  }
`;

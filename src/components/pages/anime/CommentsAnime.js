import React from "react";
import { DiscussionEmbed } from "disqus-react";
import styled from "styled-components";

export const CommentsAnime = ({ article }) => {
  return (
    <ContainerComments>
      <DiscussionEmbed
        shortname="https-animesgozu-com"
        config={{
          url: article.url,
          identifier: article.id,
          title: article.title,
          language: "es_ES",
        }}
      />
    </ContainerComments>
  );
};

const ContainerComments = styled.div`
  margin: 1rem 0;
`;

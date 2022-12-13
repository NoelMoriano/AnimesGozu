import React from "react";
import { DiscussionEmbed } from "disqus-react";
import styled from "styled-components";

export const CommentsAnime = ({ article }) => {
  console.log("article.title->", article.title);
  return (
    <ContainerComments>
      {article && (
        <DiscussionEmbed
          shortname="https-animesgozu-com"
          config={{
            url: article.url,
            identifier: article.id,
            title: article.title,
            language: "es_ES",
          }}
        />
      )}
    </ContainerComments>
  );
};

const ContainerComments = styled.div`
  margin: 2em 0;
  padding: 0 1em;
  width: 100%;
  height: 100%;
  max-height: 100%;
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchGift } from "../../components/home/SearchGift";
import { CardGift } from "../../components/home/CardGift";

const apiUrL =
  "https://api.giphy.com/v1/gifs/search?api_key=yubnbZvSyRw75BEY0eFOd1XQ9YLnxTmA";

export const Home = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("girl");

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setLoading(true);
    const response = await fetch(`${apiUrL}&q=${search || "girl"}`);
    const jsonData = await response.json();
    setGifts(jsonData.data);
    setLoading(false);
  };

  return (
    <Container>
      <h1>Gifts PE</h1>
      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          initialize();
        }}
      >
        <SearchGift onSetSearch={setSearch} />
      </form>

      <WrapperCards>
        {loading
          ? "Loading..."
          : gifts.map((gift, index) => <CardGift key={index} gift={gift} />)}
      </WrapperCards>
    </Container>
  );
};

const Container = styled.div`
  h1 {
    text-align: center;
  }
`;

const WrapperCards = styled.div`
  width: 100%;
  height: auto;
  margin: 1.7rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

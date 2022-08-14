import { Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import { Anime, Episode, Home, Login, Register, SearchResult } from "../pages";

export const Router = (animes) => (
  <Routes>
    <Route
      exact
      path="/"
      element={
        <Layout>
          <Home animes={animes} />
        </Layout>
      }
    />
    <Route
      exact
      path="/:animeId"
      element={
        <Layout>
          <Anime />
        </Layout>
      }
    />
    <Route
      exact
      path="/:animeId/:episodeId"
      element={
        <Layout>
          <Episode />
        </Layout>
      }
    />
    <Route
      exact
      path="/search"
      element={
        <Layout>
          <SearchResult />
        </Layout>
      }
    />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/register" element={<Register />} />
    <Route path="*" element={<h1>404</h1>} />
  </Routes>
);

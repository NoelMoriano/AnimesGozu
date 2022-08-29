import { Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import {
  Anime,
  Episode,
  Home,
  Login,
  Register,
  SearchResult,
  Page404,
} from "../pages";

export const Router = () => (
  <Routes>
    <Route
      exact
      path="/"
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />
    <Route
      exact
      path="/animes/:animeId"
      element={
        <Layout>
          <Anime />
        </Layout>
      }
    />
    <Route
      exact
      path="/animes/:animeId/:episodeId"
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
    <Route
      path="*"
      element={
        <Layout>
          <Page404 />
        </Layout>
      }
    />
  </Routes>
);

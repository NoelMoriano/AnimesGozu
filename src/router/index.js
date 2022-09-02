import { Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import {
  Anime,
  Episode,
  Home,
  Login,
  Page404,
  Profile,
  Register,
  SearchResult,
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
      path="/anime/:animeId"
      element={
        <Layout>
          <Anime />
        </Layout>
      }
    />
    <Route
      exact
      path="/ver/:animeId/:episodeId"
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
    <Route
      path="/profile"
      element={
        <Layout>
          <Profile />
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

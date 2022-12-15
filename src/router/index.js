import { Route, Routes } from "react-router-dom";
import { Layout, LayoutSecondary } from "../components";
import {
  Anime,
  ChatAi,
  Episode,
  Home,
  Login,
  Page404,
  Profile,
  Register,
  SearchResult,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

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
        <LayoutSecondary>
          <Episode />
        </LayoutSecondary>
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
    <Route
      path="/chat-ai"
      element={
        <PrivateRoute>
          <Layout>
            <ChatAi />
          </Layout>
        </PrivateRoute>
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

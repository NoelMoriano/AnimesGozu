import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import styled, { css } from "styled-components";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useFormUtils } from "../../hooks";
import { lighten } from "polished";
import { useAnimes } from "../../providers";
import { capitalize, includes, orderBy } from "lodash";
import { formatWord, formatWords } from "../../utils";
import ReactGA from "react-ga4";

export const InputSearch = ({ onVisibleDrawerMobile }) => {
  const { animes } = useAnimes();
  const navigate = useNavigate();

  const onNavigateTo = (urlParam) => navigate(urlParam);

  const schema = yup.object({
    search: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error } = useFormUtils({ errors, schema });

  const viewAnimes = (searchWord = "") => {
    const wordsSearch = (watch("search") || searchWord).split(" ");

    const resultSearchAnime = animes
      .filter((anime) =>
        anime.searchData.some((searchData) => {
          return wordsSearch?.length > 1
            ? includes(formatWords(wordsSearch), formatWord(searchData))
            : formatWord(searchData).indexOf(formatWord(wordsSearch)) !== -1;
        })
      )
      .filter((anime, index) => index < 6);

    return orderBy(resultSearchAnime, ["name"], ["asc"]);
  };

  const onSubmitSearch = ({ search }) => {
    ReactGA.event({
      category: "inputs",
      action: "search-anime",
      label: `Search anime ${watch("search") || search}`,
    });

    return viewAnimes(search);
  };

  const resetForm = () => reset({ search: "" });

  const hasValueSearch = !!watch("search");

  return (
    <Container hasValueSearch={hasValueSearch}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitSearch)}
      >
        <ContentBgFxSearch
          hasValueSearch={hasValueSearch}
          className="content-bg-fx-search"
          onClick={() => resetForm()}
        />
        <ContentSearch hasValueSearch={hasValueSearch}>
          <div className="wrapper-input-element">
            <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
            <Controller
              name="search"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <InputSearchElement
                  placeholder="¿Que quieres ver hoy?"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  required={required(name)}
                  className="input-search"
                />
              )}
            />
            {hasValueSearch && (
              <FontAwesomeIcon
                className="icon-clear"
                icon={faXmark}
                onClick={() => resetForm()}
              />
            )}
          </div>
          <div className="wrapper-result-search">
            <ul>
              {viewAnimes().map((anime, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onNavigateTo(`/anime/${anime.nameId}`);
                    resetForm();
                    onVisibleDrawerMobile();
                  }}
                >
                  <div className="items-list">
                    <div className="img-anime">
                      <img
                        loading="lazy"
                        src={anime?.animePicture?.thumbUrl}
                        alt={`${anime.name} - animes gozu`}
                      />
                    </div>
                    <div className="description">
                      <div className="title">{capitalize(anime?.name)}</div>
                      <div className="sub-title">
                        <span>{capitalize(anime?.category)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <li
                onClick={() => {
                  onNavigateTo(`/search`);
                  resetForm();
                }}
              >
                <div className="content-show-more">Ver más</div>
              </li>
            </ul>
          </div>
        </ContentSearch>
      </form>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  ${mediaQuery.minTablet} {
    width: auto;
  }
`;

const ContentBgFxSearch = styled.div`
  ${({ hasValueSearch }) =>
    hasValueSearch &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
    `}
`;

const InputSearchElement = styled.input`
  ${({ theme }) => css`
    width: 100%;
    color: inherit;
    padding: 0.2em 0.5em;
    background: transparent;
    border: none;
    outline: none;
    font-size: ${theme.font_sizes.small};
  `}
`;

const ContentSearch = styled.div`
  ${({ theme, hasValueSearch }) => css`
    width: 100%;
    max-width: 100%;
    ${mediaQuery.minTablet} {
      width: 20em;
      max-width: 20em;
    }
    .wrapper-input-element {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      color: ${({ theme }) => theme.colors.font1};
      background: ${({ theme }) => theme.colors.dark};
      border: ${({ theme }) => `2px solid ${theme.colors.quaternary}`};
      border-radius: 1em;
      padding: 0.5em;
      box-sizing: border-box;

      ${mediaQuery.minTablet} {
        width: 100%;
        display: grid;
        grid-template-columns: 7% 1fr 5%;
      }

      .icon-search,
      .icon-clear {
        margin: auto;
        cursor: pointer;
      }

      .icon-clear {
        display: flex;
        color: ${({ theme }) => theme.colors.font1};
      }
    }

    .wrapper-result-search {
      display: none;
      position: absolute;
      top: 3rem;
      left: 0;
      right: 0;
      width: 100%;
      height: auto;
      background: ${theme.colors.secondary};
      color: ${theme.colors.font1};
      border-radius: 0.7em;
      z-index: 999;
      ul {
        list-style: none;
      }
    }

    ${hasValueSearch &&
    css`
      .wrapper-result-search {
        display: grid;
        padding: 0.5em;
        z-index: 999;
        ul {
          li {
            outline: none;
          }
          li .items-list {
            display: grid;
            grid-template-columns: 2.7em 1fr;
            padding: 0.3em;
            gap: 0.7em;
            margin-bottom: 0.3em;
            &:hover {
              cursor: pointer;
              background: ${lighten(0.04, theme.colors.secondary)};
            }
            .img-anime {
              width: 100%;
              max-width: 2.7em;
              height: 3.2em;

              img {
                width: 100%;
                height: 100%;
                max-height: 3.2em;
                object-fit: cover;
              }
            }
            .description {
              display: grid;
              gap: 0;
              .title {
                font-size: 0.8em;
              }
              .sub-title {
                span {
                  font-size: 0.7em;
                  border-radius: 7em;
                  padding: 0.2em 0.7em;
                  background: ${lighten(0.08, theme.colors.secondary)};
                }
              }
            }
          }

          li .content-show-more {
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 0.5em;
            background: ${lighten(0.04, theme.colors.secondary)};
            cursor: pointer;
          }
        }
      }
    `}
  `}
`;

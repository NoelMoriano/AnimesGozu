import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import styled, { css } from "styled-components";
import { Form } from "./Form";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useFormUtils } from "../../hooks";
import { lighten } from "polished";
import { useAnimes } from "../../providers";
import { capitalize, includes } from "lodash";

export const InputSearch = () => {
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

  const viewAnimes = () =>
    animes
      .filter((anime) =>
        anime.searchData.some((searchData) =>
          includes(searchData, watch("search"))
        )
      )
      .filter((anime, index) => index < 6);

  const onSubmitSearch = ({ search }) => console.log("search->", search);

  const resetForm = () => reset({ search: "" });

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmitSearch)}>
        <ContentSearch hasValueSearch={!!watch("search")}>
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

            {watch("search") && (
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
                    onNavigateTo(`/anime/${anime.id}`);
                    resetForm();
                  }}
                >
                  <div className="img-anime">
                    <img
                      src={anime?.animeCoverImage?.thumbUrl}
                      alt="anime image"
                    />
                  </div>
                  <div className="description">
                    <div className="title">{capitalize(anime?.name)}</div>
                    <div className="sub-title">
                      <span>{capitalize(anime?.category)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ContentSearch>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: none;
  ${mediaQuery.minTablet} {
    display: grid;
  }
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
  width: 20em;
  max-width: 20em;
  .wrapper-input-element {
    position: relative;
    display: none;
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
  ${({ theme, hasValueSearch }) => css`
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
      ul {
        list-style: none;
      }
    }
    ${hasValueSearch &&
    css`
      .wrapper-result-search {
        display: grid;
        padding: 0.5em;
        ul {
          li {
            display: grid;
            grid-template-columns: 2.7em 1fr;
            padding: 0.2em;
            gap: 1em;
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
                font-size: 0.9em;
              }
              .sub-title {
                span {
                  font-size: 0.7em;
                  border-radius: 7em;
                  padding: 0.4em 0.7em;
                  background: ${lighten(0.08, theme.colors.secondary)};
                }
              }
            }
          }
        }
      }
    `}
  `}
`;

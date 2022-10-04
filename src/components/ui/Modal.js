import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles/constants/mediaQuery";
import { createPortal } from "react-dom";

export const ModalIntegration = ({
  visible = false,
  onClose,
  title,
  children,
  footer,
}) => {
  const rootPortal = document.getElementById("root-portal");

  return createPortal(
    <Modal
      visible={visible}
      onClose={onClose}
      title={title}
      children={children}
      footer={footer}
    />,
    rootPortal
  );
};

const Modal = ({ visible, onClose, title, children, footer }) => {
  const [isVisibleModalBg, setIsVisibleModalBg] = useState(false);

  useEffect(() => {
    visible ? onSetIsVisibleModalBg() : onCloseModal();
  }, [visible]);

  const onSetIsVisibleModalBg = () => {
    setTimeout(() => {
      setIsVisibleModalBg(true);
    }, 270);
  };

  const onCloseModal = () => {
    setIsVisibleModalBg(false);
    return onClose();
  };

  return (
    <Container visible={visible} isVisibleBg={isVisibleModalBg}>
      <div className="bg-modal" onClick={() => onCloseModal()} />
      <div className="modal-container">
        <div className="item-close" onClick={() => onCloseModal()}>
          <FontAwesomeIcon icon={faClose} size="lg" className="icon-close" />
        </div>
        {title && (
          <div className="content-header">
            <div className="title">{title}</div>
          </div>
        )}
        <div className="body">{children}</div>
        <div className="footer"></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${({ visible, isVisibleBg }) => css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: ${visible ? "scale(1)" : "scale(0)"};
    transition: all ease-in-out 0.3s;
    .bg-modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      z-index: 888;
      background: ${isVisibleBg ? "rgba(0, 0, 0, 0.4)" : "transparent"};
    }
    .modal-container {
      width: 95%;
      height: auto;
      margin: auto;
      background: ${({ theme }) => theme.colors.tertiary};
      display: grid;
      grid-template-rows: auto 1fr auto;
      position: relative;
      z-index: 99999;
      box-sizing: border-box;

      ${mediaQuery.minTablet} {
        width: 50vw;
      }
      .content-header {
        padding: 1.7rem 1.7rem 1rem 1.7rem;
        box-sizing: border-box;
        .title {
          display: flex;
          align-items: center;
          padding-right: 1.7rem;
          h4 {
            margin: 0;
          }
        }
      }
      .item-close {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 1.3rem;
      }

      .body {
        padding: 1rem 1.7rem;
        box-sizing: border-box;
      }
      .footer {
        padding: 1rem;
      }
    }
  `}
`;

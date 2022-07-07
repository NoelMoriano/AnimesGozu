import styled from "styled-components";
import { ImgLogo } from "../../images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <Container>
      <div className="img-box">
        <img src={ImgLogo} alt="" />
      </div>
      <div className="search-box">
        <FontAwesomeIcon className="item-icon" icon={faMagnifyingGlass} />
        <input type="text" placeholder="¿Que quieres ver hoy?" />
        {/*<FontAwesomeIcon className="item-icon" icon={faXmark} />*/}
      </div>
    </Container>
  );
};

const Container = styled.div`
  grid-column: span 2;
  background: #1e1e1e;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  border-bottom: 2px solid #414040;
  .img-box {
    img {
      width: 8.5rem;
    }
  }
  .search-box {
    position: relative;
    input {
      color: #fff;
      background: #070707;
      border: 2px solid #414040;
      border-radius: 1em;
      padding: 0.8em 3em;
    }
    .item-icon {
      position: absolute;
      top: 0.7rem;
      left: 0.7rem;
    }
  }
`;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegAddressBook } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { LuUserCog, LuMessagesSquare } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  a {
    padding: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    color: black;
    transition: all 0.2s ease;
    &:hover {
      color: #c8152c;
      scale: 1.1;
    }
    &:focus {
      background-color: white;
      border-radius: 5px;
    }
  }

  svg {
    width: 100%;
    font-size: 1.5rem;
  }

  @media (max-width: 900px) {
    flex-direction: row;
    height: 100%;
  }
  @media (max-width: 550px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

function HeadersAdmin() {
  
  const Logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <Container>
      <Link to="/admin">
        <RxDashboard />
        <p>Dashboard</p>
      </Link>
      <Link to="/admin/locations">
        <FaRegAddressBook />

        <p>Locations</p>
      </Link>
      <Link to="/admin/voitures">
        <IoCarSportOutline />

        <p>Voitures</p>
      </Link>

      <Link to="/admin/clients">
        <LuUserCog />

        <p>Clients</p>
      </Link>
      <Link to="/admin/mesages">
        <LuMessagesSquare />
        <p>Messages</p>
      </Link>
      <Link to="/" onClick={Logout}>
        <BiLogOut />
        <p>Logout</p>
      </Link>
    </Container>
  );
}

export default HeadersAdmin;

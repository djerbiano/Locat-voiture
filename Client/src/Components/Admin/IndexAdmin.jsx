import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeadersAdmin from "./ComponentsAdmin/HeadersAdmin";
import DashboardAdmin from "./ComponentsAdmin/Dashboard/DashboardAdmin";
import LocationsAdmin from "./ComponentsAdmin/Locations/LocationsAdmin";
import VoituresAdmin from "./ComponentsAdmin/Voitures/VoituresAdmin";
import ClientsAdmin from "./ComponentsAdmin/Clients/ClientsAdmin";
import MessagesAdmin from "./ComponentsAdmin/Messages/MessagesAdmin";

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Header = styled.div`
  padding: 10px;
  width: 10%;
  height: 100%;
  background-color: #fefefea8;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Main = styled.div`
  padding: 10px;
  color: black;
  width: 90%;
  background-color: #fefefea8;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    width: 100%;
    min-height: 60vh;
  }
`;

function Index() {
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const location = useLocation();
  const isAdmin = sessionStorage.getItem("isAdmin");

  // get admin
  useEffect(() => {
    const checkAdmin = () => {
      try {
        if (!isAdmin || isAdmin === "false") {
          navigate("/");
          return null;
        }

        switch (location.pathname) {
          case "/admin":
            setComponent(<DashboardAdmin />);
            break;
          case "/admin/locations":
            setComponent(<LocationsAdmin />);
            break;

          case "/admin/voitures":
            setComponent(<VoituresAdmin />);
            break;

          case "/admin/clients":
            setComponent(<ClientsAdmin />);
            break;

          case "/admin/mesages":
            setComponent(<MessagesAdmin />);
            break;

          default:
            setComponent(<DashboardAdmin />);
            break;
        }
      } catch (error) {
        console.error("Error catch:", error);
        navigate("/");
      }
    };

    checkAdmin();
  }, [location.pathname, navigate, isAdmin]);
  
  if (!isAdmin || isAdmin === "false") {
    return null;
  }
  return (
    <Container>
      <Header>
        <HeadersAdmin />
      </Header>
      <Main>{component}</Main>
    </Container>
  );
}

export default Index;

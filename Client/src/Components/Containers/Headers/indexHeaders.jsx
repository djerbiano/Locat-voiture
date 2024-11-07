import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderContainer = styled.div`
  width: 100%;
  height: 13vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0px 0px 20px 20px;
  margin-bottom: 20px;
  background-color: #2e2f33;

  @media (max-width: 750px) {
    display: none;
  }
`;

const LinkItem = styled(Link)`
  padding: 15px;
  border-right: 2px solid red;
  border-bottom: 2px solid red;
  border-radius: 50%;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;
  &:hover {
    scale: 1.2;
    transition: all 0.2s ease;
  }
`;

const HamburgerMenu = styled.div`
  width: 100%;
  height: 13vh;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => (props.$menuHamburgerView ? "0px" : "20px")};
  margin-bottom: 20px;
  background-color: #2e2f33;
  display: none;
  @media (max-width: 750px) {
    display: block;
  }

  .hamburger {
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 1.5em;
      font-weight: bold;
      color: #c8152c;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      transition: all 0.2s ease;
    }
    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        scale: 1.2;
        transition: all 0.2s ease;
      }
    }
  }
  .menu {
    position: absolute;
    z-index: 1;
    width: 100%;
    min-height: 70vh;
    padding: 20px;
    background-color: #2e2f33;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const MenuItems = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-right: 2px solid red;
  border-bottom: 2px solid red;
  border-radius: 50%;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;
  &:hover {
    scale: 1.2;
    transition: all 0.2s ease;
  }
`;
function IndexHeaders() {
  const [menuHamburgerView, setMenuHamburgerView] = useState(false);

  const handleMenuToggle = () => {
    setMenuHamburgerView(!menuHamburgerView);
  };

  return (
    <>
      <HeaderContainer>
        <LinkItem to="/">Acceuil</LinkItem>
        <LinkItem to="Voitures">Voitures</LinkItem>
        <LinkItem to="Tarifs">Tarifs</LinkItem>
        <LinkItem to="Contact">Contact</LinkItem>
        <LinkItem to="MaReservation">Ma réservation</LinkItem>
      </HeaderContainer>

      <HamburgerMenu $menuHamburgerView={menuHamburgerView}>
        <div className="hamburger">
          <div>
            <h1>Loca-voiture</h1>
          </div>
          <GiHamburgerMenu onClick={() => handleMenuToggle()} />
        </div>
        {menuHamburgerView && (
          <div className="menu">
            <MenuItems to="/" onClick={() => handleMenuToggle()}>Acceuil</MenuItems>
            <MenuItems to="Voitures" onClick={() => handleMenuToggle()}>Voitures</MenuItems>
            <MenuItems to="Tarifs" onClick={() => handleMenuToggle()}>Tarifs</MenuItems>
            <MenuItems to="Contact" onClick={() => handleMenuToggle()}>Contact</MenuItems>
            <MenuItems to="MaReservation" onClick={() => handleMenuToggle()}>Ma réservation</MenuItems>
          </div>
        )}
      </HamburgerMenu>
    </>
  );
}

export default IndexHeaders;

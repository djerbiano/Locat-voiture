import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import Logo from "../../../Assets/logo23.PNG";

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
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: ${(props) => (props.$menuHamburgerView ? "0px" : "20px")};
  transition: all 0.2s ease;
  margin-bottom: 20px;
  background: linear-gradient(
    90deg,
    rgb(46 47 50) 30%,
    rgb(46 47 50) 24%,
    rgb(200 21 44) 100%
  );
  display: none;
  @media (max-width: 750px) {
    display: ${(props) => (props.$loading ? "none" : "block")};
   //display: block;
  }

  .hamburger {
    padding: 10px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      max-width: 200px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    svg {
      width: 80px;
      height: 50px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        scale: 1.2;
        transition: all 0.2s ease;
      }
    }
  }

  .openMenu {
    position: fixed;
    z-index: 1000;
    min-height: 70vh;
    padding: 20px;
    width: 100vw;
    background-color: #2e2f33;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transform: translateY(0px);
    transition: all 0.5s ease-in;
    opacity: 1;
  }

  .closeMenu {
    position: fixed;
    z-index: 1;
    width: 100vw;
    min-height: 0vh;
    padding: 20px;
    background-color: #2e2f33;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transform: translateY(-600px);
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }
`;

const MenuItems = styled(Link)`
  font-size: 1.2rem;
  min-width: 25%;
  height: 70px;
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
    transition: all 0.2s ease;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    color: red;
  }
`;
function IndexHeaders({ setSearcherCar, setSearchWithiVoiturePage, loading }) {
  const navigate = useNavigate();
  const [menuHamburgerView, setMenuHamburgerView] = useState(false);
  const [animationBurgerMenu, setAnimationBurgerMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // scrolling to top 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleMenuToggle = () => {
    setMenuHamburgerView(!menuHamburgerView);
    setAnimationBurgerMenu(!animationBurgerMenu);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = (to) => {
    navigate(to);
    scrollToTop();
    setMenuHamburgerView(false);
  };

  return (
    <>
      <HeaderContainer>
        <LinkItem to="/">Acceuil</LinkItem>
        <LinkItem
          to="Voitures"
          onClick={() => {
            setSearcherCar(false);
            setSearchWithiVoiturePage(false);
          }}
        >
          Voitures
        </LinkItem>
        <LinkItem to="Tarifs">Tarifs</LinkItem>
        <LinkItem to="Contact">Contact</LinkItem>
        <LinkItem to="MesReservation">Mes réservation</LinkItem>
      </HeaderContainer>

      <HamburgerMenu $menuHamburgerView={menuHamburgerView} $loading={loading}>
        <div className="hamburger">
          <div onClick={() => navigate("/")}>
            <img src={Logo} alt="logo" />
          </div>

          {menuHamburgerView || isScrolled ? (
            <IoMdCloseCircle
              onClick={() => {
                handleMenuToggle();
                setAnimationBurgerMenu(false);
              }}
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => {
                handleMenuToggle();
                setAnimationBurgerMenu(true);
              }}
            />
          )}
        </div>

        <div className={`${animationBurgerMenu ? "openMenu" : "closeMenu"}`}>
          <MenuItems
            to="/"
            onClick={() => {
              handleClick("/");
              setAnimationBurgerMenu(!animationBurgerMenu);
            }}
          >
            Acceuil
          </MenuItems>
          <MenuItems
            to="Voitures"
            onClick={() => {
              handleClick("Voitures");
              setAnimationBurgerMenu(!animationBurgerMenu);
            }}
          >
            Voitures
          </MenuItems>
          <MenuItems
            to="Tarifs"
            onClick={() => {
              handleClick("Tarifs");
              setAnimationBurgerMenu(!animationBurgerMenu);
            }}
          >
            Tarifs
          </MenuItems>
          <MenuItems
            to="Contact"
            onClick={() => {
              handleClick("Contact");
              setAnimationBurgerMenu(!animationBurgerMenu);
            }}
          >
            Contact
          </MenuItems>
          <MenuItems
            to="MesReservation"
            onClick={() => {
              handleClick("MesReservation");
              setAnimationBurgerMenu(!animationBurgerMenu);
            }}
          >
            Mes réservation
          </MenuItems>
        </div>
      </HamburgerMenu>
    </>
  );
}

export default IndexHeaders;

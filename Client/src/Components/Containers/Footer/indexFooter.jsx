import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const FooterContainer = styled.footer`
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0px 0px;
  margin-top: 10px;
`;

const LinkContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  font-size: 1.3rem;

  @media (max-width: 750px) {
    flex-direction: column;
    font-size: 1.3rem;
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;
  text-align: center;
  &:hover {
    color: #c8152c;
  }
`;

const Copyright = styled.div`
  margin: 40px;
  text-transform: uppercase;
  text-align: center;
`;

function IndexFooter() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = (to) => {
    navigate(to);
    scrollToTop();
  };

  return (
    <FooterContainer>
      <LinkContainer>
        <LinkItem
          to="/mentions-legales"
          onClick={() => handleClick("/mentions-legales")}
        >
          Mentions légales
        </LinkItem>
        <LinkItem
          to="/politique-de-confidentialite"
          onClick={() => handleClick("/politique-de-confidentialite")}
        >
          Politique de confidentialité
        </LinkItem>
        <LinkItem
          to="/politique-de-cookies"
          onClick={() => handleClick("/politique-de-cookies")}
        >
          Politique de cookies
        </LinkItem>
        <LinkItem
          to="/conditions-generales-d-utilisation"
          onClick={() => handleClick("/conditions-generales-d-utilisation")}
        >
          Conditions générales d'utilisation
        </LinkItem>
        <LinkItem
          to="/conditions-generales-de-location"
          onClick={() => handleClick("/conditions-generales-de-location")}
        >
          Conditions générales de location
        </LinkItem>
      </LinkContainer>
      <Copyright>
        <p>© {new Date().getFullYear()} tous droits réservés</p>
      </Copyright>
    </FooterContainer>
  );
}

export default IndexFooter;

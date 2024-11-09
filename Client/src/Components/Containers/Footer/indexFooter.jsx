import styled from "styled-components";
import { Link } from "react-router-dom";

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
  return (
    <FooterContainer>
      <LinkContainer>
        <LinkItem to="/mentions-legales">Mentions légales</LinkItem>
        <LinkItem to="/politique-de-confidentialite">
          Politique de confidentialité
        </LinkItem>
        <LinkItem to="/politique-de-cookies">Politique de cookies</LinkItem>
        <LinkItem to="/conditions-generales-d-utilisation">
          Conditions générales d'utilisation
        </LinkItem>
        <LinkItem to="/conditions-generales-de-location">
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

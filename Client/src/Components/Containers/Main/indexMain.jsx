import styled, { keyframes, css } from "styled-components";
import Pic from "../../../Assets/4.jpg";
import Pic2 from "../../../Assets/1.png";
import { useState } from "react";

const MainContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  position: relative;
`;

const FirstGlobalContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-image: url(${Pic});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  transition: all 0.2s ease;
  @media (max-width: 750px) {
    width: 100%;
    transition: all 0.2s ease;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 2.5em;
    font-weight: bold;
    color: #c8152c;
    font-family: "comic sans ms";
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    transition: all 0.2s ease;
  }
`;

const Content = styled.div`
  color: black;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
`;
const AutreAgence = styled.div`
  margin-bottom: 20px;
`;

const Promotion = styled.div`
  margin-bottom: 20px;
`;

const ButtonRecherche = styled.button`
  min-width: 40%;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #c8152c;
  color: black;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: #ddd;
    transition: all 0.2s ease;
  }
`;

const SecondGlobalContainer = styled.div`
  width: 100%;
  min-height: 50vh;
`;

const Container2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  transition: all 0.2s ease;

  h1 {
    margin: 20px 0px;
    font-weight: bold;
    color: #c8152c;
    font-family: "comic sans ms";
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    transition: all 0.2s ease;

    @media (max-width: 750px) {
      font-size: 5vw;
    }
  }
`;

const Content2 = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  color: black;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Vl = styled.div`
  height: 300px;
  width: 400px;
  margin: 20px;
  border-radius: 50px 0px 50px 0px;
  box-shadow: 0px 0px 10px white;

  @media (max-width: 750px) {
    width: 70vw;
    transition: all 0.2s ease;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${Pic2});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
`;

const DetailsContainer = styled.div`
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: white;
  font-weight: bold;
  border-radius: 20px;
`;

const New2024 = styled.div`
  position: absolute;
  top: 20%;
  left: 0px;
  text-transform: uppercase;
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 0px 50px 50px 0px;
`;

const Name = styled.div``;
const Prix = styled.div``;
const transition = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Reserver = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translateX(50%);
  text-transform: uppercase;
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  opacity: ${(props) => (props.reserver ? "1" : "0")};
  animation: ${(props) =>
    props.reserver
      ? css`
          ${transition} 0.5s ease
        `
      : "none"};
  transition: all 0.2s ease;

  &:hover {
    background-color: #a5a2a2;
    transition: all 0.2s ease;
  }
`;
function IndexMain() {
  const [reserver, setReserver] = useState(false);
  return (
    <MainContainer>
      <FirstGlobalContainer>
        <Container>
          <h1>Loca-voiture</h1>

          <Content>
            <label htmlFor="agence">Agence de départ</label>
            <select name="agence" id="agence">
              <option value="Agence de paris">Agence de paris</option>
              <option value="Agence de nantes">Agence de nantes</option>
              <option value="Agence de lyon">Agence de lyon</option>
              <option value="Agence de marseille">Agence de marseille</option>
              <option value="Agence de bordeaux">Agence de bordeaux</option>
            </select>
            <AutreAgence>
              <input
                type="checkbox"
                name="autreAgence"
                id="autreAgence"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="autreAgence">
                Sélectionnez une autre agence de retour
              </label>
            </AutreAgence>

            <label htmlFor="date">Date de depart</label>
            <input type="date" name="date" id="date" />

            <label htmlFor="date">Date de retour</label>
            <input type="date" name="date" id="date" />

            <label htmlFor="places">Nombre de places</label>
            <input type="number" name="places" id="places" min="1" max="7" />
            <Promotion>
              <input
                type="checkbox"
                name="promotion"
                id="promotion"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="promotion">J’ai un code de réduction</label>
            </Promotion>

            <ButtonRecherche type="submit">Rechercher</ButtonRecherche>
          </Content>
        </Container>
      </FirstGlobalContainer>

      <SecondGlobalContainer>
        <Container2>
          <h1>Nos promotions de location</h1>

          <Content2>
            <Vl
              onMouseEnter={() => setReserver(true)}
              onMouseLeave={() => setReserver(false)}
            >
              <ImageContainer>
                <New2024>New 2024</New2024>
                <Reserver reserver={reserver}>Réserver</Reserver>
                <DetailsContainer>
                  <Name>Mercedes-AMG GT</Name>
                  <Prix>250 € / jour</Prix>
                </DetailsContainer>
              </ImageContainer>
            </Vl>
            <Vl>
              <ImageContainer>
                <New2024>New 2024</New2024>
                <DetailsContainer>
                  <div className="name">Mercedes-AMG GT</div>
                  <div className="prix">250 € / jour</div>
                </DetailsContainer>
              </ImageContainer>
            </Vl>
            <Vl>
              <ImageContainer>
                <New2024>New 2024</New2024>
                <DetailsContainer>
                  <div className="name">Mercedes-AMG GT</div>
                  <div className="prix">250 € / jour</div>
                </DetailsContainer>
              </ImageContainer>
            </Vl>
          </Content2>
        </Container2>
      </SecondGlobalContainer>
    </MainContainer>
  );
}

export default IndexMain;

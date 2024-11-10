import styled from "styled-components";
import Pic from "../../../Assets/4.jpg";
import NewVoiture2024 from "./NewVoiture2024";
import JusteClose from "../../Modal/JusteClose";
import { useEffect, useState } from "react";
import Assistance from "./Assistance";
import SansFraisCachés from "./SansFraisCachés";
import VoituresNeuves from "./VoituresNeuves";

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
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    transition: all 0.2s ease;

    @media (max-width: 750px) {
      display: none;
    }
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
  transition: all 0.2s ease;
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

const ThirdGlobalContainer = styled.div`
  width: 100%;
  min-height: 50vh;
`;

const Container3 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  transition: all 0.2s ease;

  h1 {
    margin: 20px;
    font-weight: bold;
    color: #c8152c;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    transition: all 0.2s ease;

    @media (max-width: 750px) {
      font-size: 5vw;
    }
  }
`;

const Content3 = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  color: black;
  font-weight: bold;
  text-align: center;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

function IndexMain() {
  const [modalJustClose, setModalJustClose] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [otherAgency, setOtherAgency] = useState(false);

  useEffect(() => {
    if (modalJustClose) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalJustClose]);

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
                onChange={() => setOtherAgency(!otherAgency)}
              />
              <label htmlFor="autreAgence">
                Sélectionnez une autre agence de retour
              </label>
            </AutreAgence>

            {otherAgency && (
              <div
                style={{
                  border: "1px solid red",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <label htmlFor="agenceReturn">Agence de retour</label>
                <select name="agenceReturn" id="agenceReturn">
                  <option value="Agence de paris">Agence de paris</option>
                  <option value="Agence de nantes">Agence de nantes</option>
                  <option value="Agence de lyon">Agence de lyon</option>
                  <option value="Agence de marseille">
                    Agence de marseille
                  </option>
                  <option value="Agence de bordeaux">Agence de bordeaux</option>
                </select>
              </div>
            )}

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
            <NewVoiture2024 />
            <NewVoiture2024 />
            <NewVoiture2024 />
          </Content2>
        </Container2>
      </SecondGlobalContainer>

      <ThirdGlobalContainer>
        <Container3>
          <h1>Pourquoi nous choisir?</h1>
          <Content3>
            <Assistance
              setModalContent={setModalContent}
              setModalJustClose={setModalJustClose}
            />
            <SansFraisCachés
              setModalContent={setModalContent}
              setModalJustClose={setModalJustClose}
            />
            <VoituresNeuves
              setModalContent={setModalContent}
              setModalJustClose={setModalJustClose}
            />
          </Content3>
        </Container3>
      </ThirdGlobalContainer>

      {modalJustClose && (
        <JusteClose
          setModalJustClose={setModalJustClose}
          content={modalContent}
        />
      )}
    </MainContainer>
  );
}

export default IndexMain;

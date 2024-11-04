import styled from "styled-components";
import Pic from "../../../Assets/4.jpg";

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

  .container {
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
  }

  .content {
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

    .autreAgence {
      margin-bottom: 20px;
    }

    .promotion {
      margin-bottom: 20px;
    }
  }
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

  background-color: lightblue;
`;
function indexMain() {
  return (
    <MainContainer>
      <FirstGlobalContainer>
        <div className="container">
          <h1>Loca-voiture</h1>

          <div className="content">
            <label htmlFor="agence">Agence de départ</label>
            <select name="agence" id="agence">
              <option value="Agence de paris">Agence de paris</option>
              <option value="Agence de nantes">Agence de nantes</option>
              <option value="Agence de lyon">Agence de lyon</option>
              <option value="Agence de marseille">Agence de marseille</option>
              <option value="Agence de bordeaux">Agence de bordeaux</option>
            </select>
            <div className="autreAgence">
              <input
                type="checkbox"
                name="autreAgence"
                id="autreAgence"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="autreAgence">
                Sélectionnez une autre agence de retour
              </label>
            </div>

            <label htmlFor="date">Date de depart</label>
            <input type="date" name="date" id="date" />

            <label htmlFor="date">Date de retour</label>
            <input type="date" name="date" id="date" />

            <label htmlFor="places">Nombre de places</label>
            <input type="number" name="places" id="places" min="1" max="7" />
            <div className="promotion">
              <input
                type="checkbox"
                name="promotion"
                id="promotion"
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="promotion">J’ai un code de réduction</label>
            </div>

            <ButtonRecherche type="submit">Rechercher</ButtonRecherche>
          </div>
        </div>
      </FirstGlobalContainer>

      <SecondGlobalContainer></SecondGlobalContainer>
    </MainContainer>
  );
}

export default indexMain;

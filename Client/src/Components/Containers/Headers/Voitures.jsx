import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
`;

const Content = styled.div``;
const ReservationContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 150px;
    height: 100%;
    margin: 10px;
    padding: 20px;

    label {
      text-align: center;
      text-overflow: ellipsis;
      width: 100%;
    }

    select {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #fff;
      padding: 5px;
      margin: 5px;
      margin-bottom: 20px;
    }
  }
`;

function Voitures() {
  return (
    <Container>
      <Content>
        <ReservationContainer>
          <div className="item">
            <label htmlFor="agence">Lieu de prise en charge</label>
            <select name="agence" id="agence">
              <option value="Agence de paris">Agence de paris</option>
              <option value="Agence de nantes">Agence de nantes</option>
              <option value="Agence de lyon">Agence de lyon</option>
              <option value="Agence de marseille">Agence de marseille</option>
              <option value="Agence de bordeaux">Agence de bordeaux</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="agenceReturn">Lieu de restitution</label>
            <select name="agence" id="agenceReturn">
              <option value="Agence de paris">Agence de paris</option>
              <option value="Agence de nantes">Agence de nantes</option>
              <option value="Agence de lyon">Agence de lyon</option>
              <option value="Agence de marseille">Agence de marseille</option>
              <option value="Agence de bordeaux">Agence de bordeaux</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="date">Date et heure de prise</label>
            <input type="datetime-local" id="date" name="date" />
          </div>
          <div className="item">
            <label htmlFor="dateReturn">Date et heure de retour</label>
            <input type="datetime-local" id="dateReturn" name="date" />
          </div>
          <div className="item">
            <label htmlFor="places">Nombre de places</label>
            <input type="number" id="places" name="places" min="1" max="7" />
          </div>
          <div className="item">
            <button>Rechercher</button>
          </div>
        </ReservationContainer>
      </Content>
    </Container>
  );
}

export default Voitures;

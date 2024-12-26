import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  min-height: 70vh;
  background-color: #fefefea8;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;
`;
const ButtonRetour = styled.button`
  width: 100px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #c8152c;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #a50a1e;
  }
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  input,
  select {
    width: 200px;
    padding: 5px;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

function UpdateCar({ setUpdateModal }) {
  // eslint-disable-next-line
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  //console.log(formData)
  //update booking status
  /* const updateBookingStatus = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/cars/update/${idVoiture}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ status: updateStatus }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModalJustClose(true);
        setContent(
          `Le nouveau statu de la réservation est : ${data.updatedBooking.status}`
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setModalJustClose(true);
        setContent(data.message);
      }
    } catch (error) {
      console.log(error);
      setModalJustClose(true);
      setContent(error.message);
    }
  };*/
  return (
    <Container>
      <ButtonRetour type="button" onClick={() => setUpdateModal(false)}>
        Retour
      </ButtonRetour>
      <Form>
        <div>
          <label htmlFor="marque">Marque:</label>
          <input
            type="text"
            name="marque"
            id="marque"
            onChange={handleChange}
          />
          <p>*Valeur actuelle : test</p>
        </div>
        <div>
          <label htmlFor="modele">Modèle:</label>
          <input
            type="text"
            name="modele"
            id="modele"
            onChange={handleChange}
          />
          <p>*Valeur actuelle : test</p>
        </div>

        <div>
          <label htmlFor="color">Couleur:</label>
          <input type="text" name="color" id="color" onChange={handleChange} />
          <p>*Valeur actuelle : test</p>
        </div>
        <div>
          <label htmlFor="place">NB Place:</label>
          <input
            type="number"
            name="place"
            id="place"
            onChange={handleChange}
          />
          <p>*Valeur actuelle : test</p>
        </div>

        <div>
          <label htmlFor="doors">Portes:</label>
          <input
            type="number"
            name="doors"
            id="doors"
            onChange={handleChange}
          />
          <p>*Valeur actuelle : test</p>
        </div>
        <div>
          <label htmlFor="pricePerDay">Prix par jour:</label>
          <input
            type="number"
            name="pricePerDay"
            id="pricePerDay"
            min="1"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="stockOfCar">Stock:</label>
          <input
            type="number"
            name="stockOfCar"
            id="stockOfCar"
            min="0"
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="transmission" id="transmission" onChange={handleChange}>
            <option value="">Transmission</option>
            <option value="manuelle">Manuelle</option>
            <option value="automatique">Automatique</option>
          </select>
          <p>*Valeur actuelle : test</p>
        </div>

        <div>
          <select name="category" id="category" onChange={handleChange}>
            <option value="">Catégories</option>
            <option value="Économique">Économique</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Premium">Premium</option>
          </select>
          <p>*Valeur actuelle : test</p>
        </div>

        <div>
          <select name="fuel" id="fuel" onChange={handleChange}>
            <option value="">Carburant</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Electrique">Electrique</option>
          </select>
          <p>*Valeur actuelle : test</p>
        </div>
        <div>
          <select name="available" id="available" onChange={handleChange}>
            <option value="">Louable</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
          <p>*Valeur actuelle : test</p>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            cols="20"
            rows="5"
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
      </Form>
    </Container>
  );
}

export default UpdateCar;

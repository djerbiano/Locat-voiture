import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  p {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .containterInput {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    @media (max-width: 650px) {
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (max-width: 502px) {
      * {
        width: 100% !important;
      }
    }
  }
  .form-input-text {
    width: 200px;
    padding: 15px;
    border: 1px solid black;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    input {
      cursor: auto;
    }
  }

  .form-input-number {
    width: 200px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 10px;
  }

  .form-input-select {
    width: 200px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 10px;
  }

  > :last-child {
    width: 100%;
    display: flex;
    flex-direction: column;

    label {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    textarea {
      padding: 15px;
      border: 1px solid black;
      border-radius: 10px;
      resize: none;
      max-height: 200px;
      font-size: 1rem;
    }
  }

  .imageContainer {
    min-width: 150px;
    display: flex;
    flex-direction: column;
    padding: 10px;

    input {
      display: none;
    }

    label {
      background-color: #058d16;
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-align: center;

      &:hover {
        background-color: rgb(3, 108, 17);
      }
    }
  }
`;

const ButtonAjouter = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #058d16;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  align-self: center;
  &:hover {
    background-color: rgb(3, 108, 17);
  }
`;

function AddNewCar({ setLoading, setModalJustClose, setContent }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files) {
      const firstFile = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "available" ? value === "true" : value,
        image: firstFile,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "available" ? value === "true" : value,
      }));
    }
  };

  const AddCar = async (e) => {
    const token = sessionStorage.getItem("token");
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/cars/register`,
        {
          method: "POST",
          headers: {
            token,
          },
          body: formDataToSend,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModalJustClose(true);
        setContent(data.message);
        setLoading(false);
        navigate("/admin/voitures");
      } else {
        setModalJustClose(true);
        setContent(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setModalJustClose(true);
      setContent(error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <ButtonRetour type="button" onClick={() => navigate(-1)}>
        Retour
      </ButtonRetour>
      <Form>
        <div className="containterInput">
          <div className="form-input-text">
            <div>
              <label htmlFor="marque">Marque:</label>
              <input
                type="text"
                name="marque"
                id="marque"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="modele">Modèle:</label>
              <input
                type="text"
                name="modele"
                id="modele"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="color">Couleur:</label>
              <input
                type="text"
                name="color"
                id="color"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-input-number">
            <div>
              <label htmlFor="place">NB Place:</label>
              <input
                type="number"
                name="place"
                id="place"
                min="1"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="doors">Portes:</label>
              <input
                type="number"
                name="doors"
                id="doors"
                min="2"
                onChange={handleChange}
              />
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
          </div>

          <div className="form-input-select">
            <div>
              <select
                name="transmission"
                id="transmission"
                onChange={handleChange}
              >
                <option value="">Transmission</option>
                <option value="manuelle">Manuelle</option>
                <option value="automatique">Automatique</option>
              </select>
            </div>

            <div>
              <select name="category" id="category" onChange={handleChange}>
                <option value="">Catégories</option>
                <option value="Économique">Économique</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <select name="fuel" id="fuel" onChange={handleChange}>
                <option value="">Carburant</option>
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
                <option value="Electrique">Electrique</option>
              </select>
            </div>
            <div>
              <select name="available" id="available" onChange={handleChange}>
                <option value="">Louable</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
            <div className="imageContainer">
              <label htmlFor="image">Image :</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            cols="40"
            rows="10"
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
      </Form>
      <ButtonAjouter type="button" onClick={AddCar}>
        Ajouter
      </ButtonAjouter>
    </Container>
  );
}

export default AddNewCar;

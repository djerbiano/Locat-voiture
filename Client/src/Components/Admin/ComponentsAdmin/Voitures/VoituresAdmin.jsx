import styled from "styled-components";
import { IoReload } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  position: relative;
`;
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.1s ease;

    &:hover {
      transform: scale(1.1);
      font-weight: bold;
    }
  }
`;

const ButtonAddNewCar = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

const Sort = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  select {
    width: 150px;
  }
`;

const SortPrice = styled.div`
  display: flex;
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100px;
  }
`;

const Search = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    width: 30%;
  }
`;

const CarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;

    th {
      background-color: rgb(255, 251, 251);
      border: 1px solid black;
      padding: 10px;
      text-align: center;
    }

    td {
      padding: 5px;
      border: 1px solid black;
      text-align: left;
    }
  }
`;

function VoituresAdmin() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [car, setCar] = useState([]);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [filter, setFilter] = useState({
    category: "",
    marque: "",
    transmission: "",
    fuel: "",
    available: null,
    prixMin: 1,
    prixMax: 1000,
  });

  //handler search
  const handleSubmit = (e) => {
    setFilter((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //get all booking
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!sessionStorage.getItem("token")) {
        return window.location.replace("/login");
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/cars/admin/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setOriginalData(data.cars);
          setCar(data.cars);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //filter data
  useEffect(() => {
    let filtredData = [...originalData];

    if (filter.category) {
      filtredData = filtredData.filter(
        (item) => item.category === filter.category
      );
    }

    if (filter.transmission) {
      filtredData = filtredData.filter(
        (item) => item.transmission === filter.transmission
      );
    }

    if (filter.fuel) {
      filtredData = filtredData.filter((item) => item.fuel === filter.fuel);
    }

    // voiture louable
    if (filter.available === "true") {
      filtredData = filtredData.filter((item) => item.available === true);
    } else if (filter.available === "false") {
      filtredData = filtredData.filter((item) => item.available === false);
    }

    // prix
    if (filter.prixMax <= filter.prixMin) {
      setInvalidPrice(true);
    } else {
      setInvalidPrice(false);
    }
    if (filter.prixMin >= 0) {
      filtredData = filtredData.filter(
        (item) => item.pricePerDay >= filter.prixMin
      );
    }

    if (filter.prixMax > 0) {
      filtredData = filtredData.filter(
        (item) => item.pricePerDay <= Math.max(filter.prixMax, filter.prixMin)
      );
    }

    if (filter.marque) {
      filtredData = filtredData.filter((item) =>
        item.marque.toLowerCase().includes(filter.marque.toLowerCase())
      );
    }

    setCar(filtredData);
  }, [filter, originalData]);

  return (
    <Container>
      <Title onClick={() => window.location.reload()}>
        <h2>Voitures</h2>
        <IoReload />
      </Title>
      <ButtonAddNewCar
        type="button"
        onClick={() => navigate("/admin/voitures/AddNewCar")}
      >
        Ajouter
      </ButtonAddNewCar>
      <Sort>
        <select name="category" id="category" onChange={handleSubmit}>
          <option value="">Catégorie</option>
          <option value="Économique">Économique</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Premium">Premium</option>
        </select>
        <select name="transmission" id="transmission" onChange={handleSubmit}>
          <option value="">Transmission</option>
          <option value="automatique">automatique</option>
          <option value="manuelle">manuelle</option>
        </select>

        <select name="fuel" id="fuel" onChange={handleSubmit}>
          <option value="">Carburant</option>
          <option value="Essence">Essence</option>
          <option value="Diesel">Diesel</option>
          <option value="Electrique">Electrique</option>
        </select>

        <select name="available" id="available" onChange={handleSubmit}>
          <option value="">Louable</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </Sort>
      <SortPrice>
        <div>
          <label htmlFor="prixMin">Prix min</label>
          <input
            type="number"
            min="0"
            name="prixMin"
            id="prixMin"
            placeholder="Prix min"
            value={filter.prixMin}
            onChange={handleSubmit}
          />
        </div>
        <div>
          <label htmlFor="prixMax">Prix max</label>
          <input
            type="number"
            min="1"
            name="prixMax"
            id="prixMax"
            placeholder="Prix max"
            value={filter.prixMax}
            onChange={handleSubmit}
          />
        </div>
      </SortPrice>
      {invalidPrice && (
        <p style={{ color: "red" }}>
          Le prix max doit etre supérieur au prix min
        </p>
      )}
      <Search>
        <input
          type="text"
          name="marque"
          placeholder="Recherche par marque"
          onChange={handleSubmit}
        />
      </Search>
      <CarContainer>
        <table>
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Couleur</th>
              <th>Place</th>
              <th>Porte</th>
              <th>Transmission</th>
              <th>Catégorie</th>
              <th>Carburant</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Louable</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            {car?.length > 0 ? (
              car?.map((car) => (
                <tr key={car?._id}>
                  <td>{car?.marque}</td>
                  <td>{car?.modele}</td>
                  <td>{car?.color}</td>
                  <td>{car?.place}</td>
                  <td>{car?.doors}</td>
                  <td>{car?.transmission}</td>
                  <td>{car?.category}</td>
                  <td>{car?.fuel}</td>
                  <td>{car?.pricePerDay} € / jour</td>
                  <td>{car?.stockOfCar}</td>
                  <td>{car?.available ? "oui" : "non"}</td>

                  <td
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                    }}
                  >
                    <RiUserSettingsLine
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/voitures/SingleVoiture/${car?._id}`)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: "center" }}>
                  Aucune voiture trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CarContainer>
    </Container>
  );
}

export default VoituresAdmin;

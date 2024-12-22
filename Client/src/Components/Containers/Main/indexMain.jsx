import styled from "styled-components";
import Pic from "../../../Assets/4.jpg";
import NewVoiture2024 from "./NewVoiture2024";
import JusteClose from "../../Modal/JusteClose";
import { useEffect, useState } from "react";
import Assistance from "./Assistance";
import SansFraisCachés from "./SansFraisCachés";
import VoituresNeuves from "./VoituresNeuves";
import { useNavigate } from "react-router-dom";

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

const Content = styled.div``;
const Form = styled.form`
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

const ButtonRecherche = styled.button`
  min-width: 40%;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #c8152c;
  color: white;
  cursor: pointer;
  align-self: center;
  font-size: 1rem;
  &:hover {
    background-color: #ddd;
    color: black;
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

function IndexMain({
  setSearcherCar,
  setSearchCarData,
  setLoading,
  setContent,
}) {
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const [modalJustClose, setModalJustClose] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [otherAgency, setOtherAgency] = useState(false);
  const [formData, setFormData] = useState({
    departAgence: "",
    autreAgence: false,
    retourAgence: "",
    startDate: "",
    endDate: "",
    place: 1,
  });

  // get new 3 cars

  useEffect(() => {
    setLoading(true);

    const getCars = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/cars/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.cars.length > 0) {
          setCar(data.cars);
        } else {
          setCar(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
        setModalJustClose(true);
        setContent("Erreur lors de la récupération des voitures");
      }
    };

    getCars();

    // eslint-disable-next-line
  }, []);

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

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearcherCar(true);
    setSearchCarData(formData);
    navigate("/voitures");
  };
  return (
    <MainContainer>
      <FirstGlobalContainer>
        <Container>
          <h1>Loca-voiture</h1>

          <Content>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="departAgence">Agence de départ</label>
              <select
                name="departAgence"
                id="departAgence"
                onChange={handleChange}
                value={formData.departAgence}
                required
              >
                <option value="">Sélectionnez une agence</option>
                <option value="Agence-de-paris">Agence-de-paris</option>
                <option value="Agence-de-nantes">Agence-de-nantes</option>
                <option value="Agence-de-lyon">Agence-de-lyon</option>
                <option value="Agence-de-marseille">Agence-de-marseille</option>
                <option value="Agence-de-bordeaux">Agence-de-bordeaux</option>
              </select>
              <AutreAgence>
                <input
                  type="checkbox"
                  name="autreAgence"
                  id="autreAgence"
                  checked={formData.autreAgence}
                  style={{ marginRight: "10px" }}
                  onChange={(e) => {
                    setOtherAgency(!otherAgency);
                    handleChange(e);
                  }}
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
                  <label htmlFor="retourAgence">Agence de retour</label>
                  <select
                    name="retourAgence"
                    id="retourAgence"
                    onChange={handleChange}
                    value={formData.retourAgence}
                    required={otherAgency}
                  >
                    <option value="">Sélectionnez une agence</option>
                    <option value="Agence-de-paris">Agence-de-paris</option>
                    <option value="Agence-de-nantes">Agence-de-nantes</option>
                    <option value="Agence-de-lyon">Agence-de-lyon</option>
                    <option value="Agence-de-marseille">
                      Agence-de-marseille
                    </option>
                    <option value="Agence-de-bordeaux">
                      Agence-de-bordeaux
                    </option>
                  </select>
                </div>
              )}

              <label htmlFor="startDate">Date de depart</label>
              <input
                type="datetime-local"
                name="startDate"
                id="startDate"
                onChange={handleChange}
                value={formData.startDate}
                required
              />

              <label htmlFor="endDate">Date de retour</label>
              <input
                type="datetime-local"
                name="endDate"
                id="endDate"
                onChange={handleChange}
                value={formData.endDate}
                required
              />

              <label htmlFor="place">Nombre de place</label>
              <input
                type="number"
                name="place"
                id="place"
                min="1"
                max="7"
                onChange={handleChange}
                value={formData.place}
              />

              <ButtonRecherche type="submit">Rechercher</ButtonRecherche>
            </Form>
          </Content>
        </Container>
      </FirstGlobalContainer>

      <SecondGlobalContainer>
        <Container2>
          <h1>Nos dernières offres</h1>

          <Content2>
            <NewVoiture2024 car={car?.[0]} />
            <NewVoiture2024 car={car?.[1]} />
            <NewVoiture2024 car={car?.[2]} />
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

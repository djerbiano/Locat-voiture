import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineMenuOpen } from "react-icons/md";
import SingleVoitureReservation from "../Headers/Voitures/SingleVoitureReservation.jsx";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import DetailsPaiementCar from "./DetailsPaiementCar.jsx";
import CreditCard from "./CreditCard.jsx";

const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  padding: 10px;
  background-color: #ffffff7a;
  border-radius: 10px;
  position: relative;

  .openSearch {
    @media (min-width: 741px) {
      display: none;
    }
    z-index: 3;
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 20%;
    display: flex;
    > * {
      font-size: 30px;
      fill: red;
      cursor: pointer;
      animation: move 2s ease infinite;
      @keyframes move {
        0% {
          transform: translateY(-5%);
        }
        50% {
          transform: translateY(5%);
        }
        100% {
          transform: translateY(-5%);
        }
      }
    }
  }
`;
const FormContainer = styled.div`
  transition: all 1s ease;
  @media (max-width: 740px) {
    transform: ${(props) =>
      props.$displaySearch ? "translate(0px)" : " translateY(-140%)"};
    opacity: ${(props) => (props.$displaySearch ? 1 : 0)};
    border-radius: 10px 0px 0px 10px;
    width: 60%;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 2;
    top: 0px;
    right: 0;
    background-color: #2e2f33;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px 5px 0 0;
  transition: all 0.2s ease;
`;

const FormFirstLine = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 740px) {
    flex-direction: column;
    width: 100%;
    height: 100%;

    //for all div in this container
    > * {
      width: 100% !important;
    }
  }
`;

const AgenceDepart = styled.div`
  width: 20%;
`;
const AgenceRetour = styled.div`
  width: 20%;

  select {
    border: 1px solid red;
    box-shadow: 0 1px 3px #c8152c;
    outline: none;
  }
`;
const DateDepart = styled.div`
  width: 20%;
`;
const DateRetour = styled.div`
  width: 20%;
`;
const Place = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
`;

const FormSecondLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;

  @media (max-width: 740px) {
    flex-direction: column;
  }

  div {
    display: flex;

    @media (max-width: 740px) {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      > * {
        flex-direction: row;
        margin-bottom: 10px;
        font-size: 1.05rem;

        input[type="checkbox"] {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  button {
    @media (max-width: 740px) {
      font-size: 1.3rem;
      min-width: 60%;
      height: 50px;
    }
  }
`;
const CheckboxAutreAgence = styled.div``;

/*const Promotion = styled.div``;*/

const ButtonRecherche = styled.button`
  width: 150px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #c8152c;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

const ContainerVoituresTrouvees = styled.div`
  display: flex;
  min-height: 50vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0 0 5px 5px;
  position: relative;

  .openFilterMenu {
    font-size: 50px;
    color: #333;
    height: 1px;
    z-index: 2;
    > * {
      animation: move 2s ease infinite;

      @keyframes move {
        0% {
          transform: translateY(-5%);
        }
        50% {
          transform: translateY(5%);
        }
        100% {
          transform: translateY(-5%);
        }
      }
    }
  }

  .closeFilterMenu {
    font-size: 50px;
    color: #333;
    height: 1px;
    z-index: 2;

    > * {
      animation: move 2s ease infinite;

      @keyframes move {
        0% {
          transform: translateY(-5%);
        }
        50% {
          transform: translateY(5%);
        }
        100% {
          transform: translateY(-5%);
        }
      }
    }
  }
`;
const FilterVoituresTrouvees = styled.div`
  .open {
    display: flex;
    flex-direction: column;
    padding: 10px;
    transition: all 1s ease;
    transform: translateY(0px);
    opacity: 1;
    width: 200px;
    position: absolute;
    top: 50px;
    left: 0;
    background-color: #2e2f33;
    border-radius: 0 5px 5px 0px;
    z-index: 1;
  }

  .close {
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 10px;
    transform: translateY(-250%);
    transition: all 1s ease-in-out;
    opacity: 0;
    width: 200px;
    position: absolute;
    top: 50px;
    left: 0;
    background-color: #2e2f33;
    border-radius: 0 5px 5px 0px;
    z-index: 1;
  }
`;

const ResultatVoituresTrouvees = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 590px) {
    justify-content: end;
  }

  @media (max-width: 360px) {
    width: 85%;
  }

  > * {
    flex: 0 0 calc(28%);

    @media (max-width: 840px) {
      flex: 0 0 calc(41%);
    }

    @media (max-width: 590px) {
      flex: 0 0 calc(100%);
      justify-content: end;
    }
  }
`;

function Reserver({
  setLoading,
  setModalJustClose,
  setContent,
  searchCarData,
  setSearchCarData,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payement, setPayement] = useState(false);
  const [car, setCar] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [displaySearch, setdisplaySearch] = useState(true);
  const [otherAgency, setOtherAgency] = useState(false);
  const [formData, setFormData] = useState({
    departAgence: "",
    autreAgence: false,
    retourAgence: "",
    startDate: "",
    endDate: "",
    place: 1,
    /*promotion: false,*/
  });
  
  const [dataSort, setDataSort] = useState({
    trierPrix: "",
    typeDeVoitures: "",
    marque: "",
    transmission: "",
  });

  const [validatePayement, setValidatePayement] = useState({
    user: "  ",
    voiture: " ",
    departAgence: "",
    retourAgence: "",
    startDate: "",
    endDate: "",
    price: "",
    status: "En-attente",
  });
  // récupération unique de data
  const uniqueMarques = [
    ...new Set(originalData.map((carMarque) => carMarque.marque)),
  ];
  const transmissionCars = [
    ...new Set(
      originalData.map((carTransmission) => carTransmission.transmission)
    ),
  ];
  const typeCars = [
    ...new Set(originalData.map((typeCar) => typeCar.category)),
  ];

  // gestion des inputs
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // gestion de tri
  const handleSort = (e) => {
    const { name, value } = e.target;
    setDataSort((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setDisplayFilter(false);
  };

  // afficher resultat trier
  useEffect(() => {
    let filteredCars = [...originalData];

    const marques = uniqueMarques;
    const transmission = transmissionCars;
    const category = typeCars;

    // Appliquer les tris
    if (dataSort.trierPrix === "PrixDécroissant") {
      filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (dataSort.trierPrix === "PrixCroissant") {
      filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    }

    // Appliquer les filtres
    if (marques.includes(dataSort.marque)) {
      filteredCars = filteredCars.filter(
        (car) => car.marque === dataSort.marque
      );
    }
    if (transmission.includes(dataSort.transmission)) {
      filteredCars = filteredCars.filter(
        (car) => car.transmission === dataSort.transmission
      );
    }

    if (category.includes(dataSort.typeDeVoitures)) {
      filteredCars = filteredCars.filter(
        (car) => car.category === dataSort.typeDeVoitures
      );
    }

    setCar(filteredCars);
    //eslint-disable-next-line
  }, [dataSort, originalData]);

  // soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchCarData(formData);

    navigate("/Reserver");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/bookings/bookingAvailable`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departAgence: formData.departAgence,
            retourAgence: formData.retourAgence
              ? formData.retourAgence
              : formData.departAgence,
            startDate: formData.startDate,
            endDate: formData.endDate,
            place: formData.place,
          }),
        }
      );
      const data = await response.json();
      if (data.cars.length > 0) {
        setCar(data.cars);
        setOriginalData(data.cars);
      } else {
        setCar(data);
        setOriginalData(data);
      }

      setLoading(false);
      setDataSort({
        trierPrix: "",
        typeDeVoitures: "",
        marque: "",
        transmission: "",
      });
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
      setModalJustClose(true);
      setContent("Erreur lors de la récupération des voitures");
    }
  };

  return (
    <Container $displaySearch={displaySearch}>
      {payement ? (
        <CreditCard
          setPayement={setPayement}
          setLoading={setLoading}
          setModalJustClose={setModalJustClose}
          setContent={setContent}
          validatePayement={validatePayement}
        />
      ) : (
        <>
          <div className="openSearch">
            {displaySearch ? (
              <IoMdCloseCircle
                onClick={() => setdisplaySearch(!displaySearch)}
              />
            ) : (
              <MdKeyboardDoubleArrowLeft
                onClick={() => setdisplaySearch(!displaySearch)}
                style={{
                  fill: "white",
                  fontSize: "30px",
                  backgroundColor: "#2e2f33",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>

          <FormContainer $displaySearch={displaySearch}>
            <Form onSubmit={handleSubmit}>
              <FormFirstLine>
                <AgenceDepart>
                  <label htmlFor="departAgence">Départ</label>
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
                    <option value="Agence-de-marseille">
                      Agence-de-marseille
                    </option>
                    <option value="Agence-de-bordeaux">
                      Agence-de-bordeaux
                    </option>
                  </select>
                </AgenceDepart>

                {otherAgency && (
                  <AgenceRetour>
                    <label htmlFor="retourAgence">Retour</label>
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
                  </AgenceRetour>
                )}
                <DateDepart>
                  <label htmlFor="startDate">Date de depart</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    onChange={handleChange}
                    value={formData.startDate}
                    required
                  />
                </DateDepart>
                <DateRetour>
                  <label htmlFor="endDate">Date de retour</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    onChange={handleChange}
                    value={formData.endDate}
                    required
                  />
                </DateRetour>
                <Place>
                  <label htmlFor="place">place</label>
                  <input
                    type="number"
                    name="place"
                    id="place"
                    min="1"
                    max="7"
                    onChange={handleChange}
                    value={formData.place}
                  />
                </Place>
              </FormFirstLine>

              <FormSecondLine>
                <div>
                  {/*<Promotion>
        <input
          type="checkbox"
          name="promotion"
          id="promotion"
          style={{ marginRight: "10px" }}
          onChange={handleChange}
          checked={formData.promotion}
        />
        <label htmlFor="promotion" style={{ marginRight: "10px" }}>
          J’ai un code de réduction
        </label>
      </Promotion>*/}
                  <CheckboxAutreAgence>
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
                  </CheckboxAutreAgence>
                </div>
                <ButtonRecherche type="submit">Rechercher</ButtonRecherche>
              </FormSecondLine>
            </Form>
          </FormContainer>

          <hr />
          <hr />
          <ContainerVoituresTrouvees>
            <FilterVoituresTrouvees>
              <div className={displayFilter ? "open" : "close"}>
                <select
                  name="trierPrix"
                  id="trierPrix"
                  value={dataSort.trierPrix}
                  onChange={handleSort}
                >
                  <option value="">Trier par</option>
                  <option value="PrixCroissant">Prix croissant</option>
                  <option value="PrixDécroissant">Prix décroissant</option>
                </select>

                <select
                  name="typeDeVoitures"
                  id="typeDeVoitures"
                  value={dataSort.typeDeVoitures}
                  onChange={handleSort}
                >
                  <option value="">Type de voiture</option>
                  {typeCars.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  name="marque"
                  id="marque"
                  value={dataSort.marque}
                  onChange={handleSort}
                >
                  <option value="">Marque</option>
                  {uniqueMarques.map((marque) => (
                    <option value={marque} key={marque}>
                      {marque}
                    </option>
                  ))}
                </select>

                <select
                  name="transmission"
                  id="transmission"
                  value={dataSort.transmission}
                  onChange={handleSort}
                >
                  <option value="">Transmission</option>
                  {transmissionCars.map((transmission) => (
                    <option value={transmission} key={transmission}>
                      {transmission}
                    </option>
                  ))}
                  <option value="lesDeux">Les deux</option>
                </select>

             
              </div>
            </FilterVoituresTrouvees>
            <div
              className={displayFilter ? "openFilterMenu" : "closeFilterMenu"}
              onClick={() => setDisplayFilter(!displayFilter)}
            >
              <MdOutlineMenuOpen style={{ cursor: "pointer" }} />
            </div>

            {car && !id ? (
              <ResultatVoituresTrouvees>
                {car?.message ? (
                  <p
                    style={{
                      textAlign: "center",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "transparent",
                      fontSize: "2rem",
                      width: "100%",
                      color: "black",
                    }}
                  >
                    {car.message}
                  </p>
                ) : (
                  car?.map((car) => (
                    <SingleVoitureReservation key={car._id} car={car} />
                  ))
                )}
              </ResultatVoituresTrouvees>
            ) : (
              id && (
                <ResultatVoituresTrouvees>
                  <DetailsPaiementCar
                    setLoading={setLoading}
                    setModalJustClose={setModalJustClose}
                    setContent={setContent}
                    searchCarData={searchCarData}
                    setPayement={setPayement}
                    setValidatePayement={setValidatePayement}
                  />
                </ResultatVoituresTrouvees>
              )
            )}
          </ContainerVoituresTrouvees>
        </>
      )}
    </Container>
  );
}

export default Reserver;

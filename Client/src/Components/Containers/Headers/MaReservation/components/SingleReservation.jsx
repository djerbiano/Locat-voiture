import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../../../../Context/AuthContext.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import YesOrNo from "../../../../Modal/YesOrNo";
import { handleErrorInvalidToken } from "../../../../../utils/helper.js";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 60%;
  min-height: 450px;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 1260px) {
    width: 80%;
  }

  @media (max-width: 970px) {
    width: 90%;
  }

  @media (max-width: 750px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const VoitureContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContainerPhoto = styled.div`
  width: 200px;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: contain;
    border-radius: 50%;
  }
`;

const VoitureInfos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    min-width: 200px;
  }
`;

const ReservationContainer = styled.div`
  width: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  > p {
    margin-bottom: 20px;
  }
  div {
    button {
      padding: 10px 20px;
      background-color: #96d900;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border: none;
      font-size: 1.1rem;
      font-weight: bold;

      &:hover {
        background-color: #7bb005;
      }
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Lieux = styled.div`
  min-height: 50px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #96d900;
  svg {
    margin: 0 10px;
    height: 100%;
  }

  @media (max-width: 750px) {
    margin-bottom: 20px;
  }

  @media (max-width: 430px) {
    min-width: 70%;
    flex-direction: column;
    font-size: 1rem;
  }

  @media (max-width: 354px) {
    flex-direction: column;
    font-size: 1rem;

    svg {
      margin: 10px;
      font-size: 1.5rem;
    }
  }
`;
function SingleReservation({ setLoading, setModalJustClose, setContent }) {
  const { isAuthenticated } = useContext(AuthContext);
  const { idBooking } = useParams();
  const [bookingData, setBookingData] = useState({});
  const [modalYesOrNo, setModalYesOrNo] = useState(false);
 

  // get booking
  useEffect(() => {
    setLoading(true);
    const getBooking = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/bookings/${idBooking}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        handleErrorInvalidToken(data.message);

        setBookingData(data.booking);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setModalJustClose(true);
        setContent("Erreur lors de la récupération de la réservation");

      }
    };

    getBooking();

    // eslint-disable-next-line
  }, [idBooking]);

  // calculate duration
  const duration = Math.ceil(
    (new Date(bookingData?.endDate) - new Date(bookingData?.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  // delete booking
  const deleteBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/bookings/deleteBooking/${idBooking}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();

      handleErrorInvalidToken(data.message);

      setLoading(false);
      setModalJustClose(true);
      setContent(data.message);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setLoading(false);
      setModalJustClose(true);
      setContent("Erreur lors de la suppression de la réservation");
    }
  };

  return (
    <>
      {isAuthenticated === "true" && (
        <Container>
          {modalYesOrNo && (
            <YesOrNo
              setModalYesOrNo={setModalYesOrNo}
              deleteBooking={deleteBooking}
            />
          )}
          {bookingData?.voiture && (
            <Content>
              <VoitureContainer>
                <ContainerPhoto>
                  <img
                    src={`${process.env.REACT_APP_URL_SERVER}/images/${bookingData.voiture.pictures.pic1}`}
                    alt={bookingData.voiture.marque}
                  />
                </ContainerPhoto>

                <VoitureInfos>
                  <p>
                    {bookingData.voiture.marque} {bookingData.voiture.modele}
                  </p>
                  <div>
                    <p>{bookingData.voiture.pricePerDay} € / jour</p>
                  </div>
                </VoitureInfos>
              </VoitureContainer>

              <ReservationContainer>
                <Lieux>
                  <h3>{bookingData.departAgence}</h3>
                  <FaArrowRightArrowLeft />
                  <h3>{bookingData.retourAgence}</h3>
                </Lieux>
                <h4>Numéro de réservation</h4>
                <p>{bookingData._id}</p>
                <h4>Date et heure de départ</h4>
                <p>
                  {new Date(bookingData.startDate)
                    .toLocaleString("fr-FR")
                    .slice(0, 16)}
                </p>
                <h4>Date et heure de retour</h4>
                <p>
                  {new Date(bookingData.endDate)
                    .toLocaleString("fr-FR")
                    .slice(0, 16)}
                </p>
                <h4>Durée de location</h4>
                <p>{duration} jours</p>
                <h4>Prix total</h4>
                <p>{bookingData.price} €</p>
                <div>
                  <button onClick={() => setModalYesOrNo(true)}>
                    Supprimer la réservation
                  </button>
                </div>
              </ReservationContainer>
            </Content>
          )}
        </Container>
      )}
    </>
  );
}

export default SingleReservation;

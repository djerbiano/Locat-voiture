import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../../Context/AuthContext.js";
import { handleErrorInvalidToken } from "../../../../../utils/helper.js";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";

const Content = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 1.2rem;
  position: relative;

  // button deconnexion
  > :nth-child(1) {
    padding: 0px 10px;
    background-color: #c8152c;
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    top: 0px;
    right: 0px;

    &:hover {
      background-color: #ddd;
      color: #333;
    }

    @media ((max-width: 360px) and (min-width: 240px)) {
      top: 40px;
    }
  }
`;

const TitleReservation = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;
const SectionReservation = styled.div`
  width: 70%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReservationDetails = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  .date {
    display: flex;

    @media (max-width: 410px) {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    svg {
      margin: 0 10px;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #c8152c;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 20px;

    &:hover {
      background-color: #ddd;
      color: #333;
    }
  }

  .dashboard {
    background-color: rgb(13, 224, 41);
    color: black;

    &:hover {
      background-color: rgba(5, 129, 22, 0.7);
      color: #333;
    }
  }
`;

const TitleReservationPassees = styled.h2`
  color: #333;
  margin: 20px;
`;

const SectionReservationPassees = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SingleReservationPassees = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ccc;
  border-radius: 10px;
  position: relative;

  .lieux {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin: 0 10px;
    }

    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        margin: 10px 0;
      }
    }
  }

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin: 0 10px;
    }
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(65%, -50%);
    @media (max-width: 1000px) {
      transform: translate(40%, -50%);
    }
    @media (max-width: 850px) {
      transform: translate(0, -50%);
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        margin: 10px 0;
      }
    }
  }

  .consulterReservation {
    button {
      padding: 10px 20px;
      background-color: #c8152c;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 20px;

      &:hover {
        background-color: #ddd;
        color: #333;
      }
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    min-height: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .date {
      transform: translate(50%, -40%);
    }

    div {
      margin-bottom: 20px;
    }
  }
`;
// Logout
const handleStorageChange = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

function ConsulterReservations({ setLoading, setModalJustClose, setContent }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const userIsAdmin = sessionStorage.getItem("isAdmin");

  // get all booking
  useEffect(() => {
    setLoading(true);

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/bookings/allBookings`,
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
        if (data.bookings?.length > 0) {
          setBookings(data.bookings);
        } else {
          setBookings(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setModalJustClose(true);
        setContent(
          "Une erreur est survenue lors du téléchargement des réservations"
        );
      }
    };

    fetchBookings();
    //eslint-disable-next-line
  }, []);

  // booking coming soon
  const upcomingBookings =
    bookings.length > 0 &&
    bookings.filter((booking) => booking.status === "acceptée");

  return (
    <>
      {isAuthenticated === "true" && (
        <Content>
          <div title="Déconnexion" onClick={handleStorageChange}>
            <GrLogout />
          </div>
          <TitleReservation>Ma réservation</TitleReservation>

          <SectionReservation>
            <ReservationDetails>
              <p
                style={{ textTransform: "capitalize" }}
              >{` ${sessionStorage.getItem(
                "lastName"
              )} ${sessionStorage.getItem("name")}`}</p>
              <p style={{ wordBreak: "break-all" }}>
                {sessionStorage.getItem("email")}
              </p>
              <p>{sessionStorage.getItem("phone")}</p>

              <p style={{ fontWeight: "bold" }}>Réservation à venir:</p>

              {upcomingBookings.length > 0 ? (
                <div className="date">
                  <p>
                    {new Date(
                      upcomingBookings[0]?.startDate
                    ).toLocaleDateString("fr-FR")}
                  </p>
                  <FaArrowRightArrowLeft />
                  <p>
                    {new Date(upcomingBookings[0].endDate).toLocaleDateString(
                      "fr-FR"
                    )}
                  </p>
                </div>
              ) : (
                <p>Aucune</p>
              )}

              <button onClick={() => navigate("/Profile")}>
                Actualisez vos données
              </button>

              {userIsAdmin === "true" && (
                <button
                  className="dashboard"
                  onClick={() => navigate("/admin")}
                >
                  Dashboard admin
                </button>
              )}
            </ReservationDetails>
          </SectionReservation>

          <TitleReservationPassees>
            Historique des réservations
          </TitleReservationPassees>
          <SectionReservationPassees>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <SingleReservationPassees key={booking._id}>
                  <div className="lieux">
                    <p>{booking.departAgence}</p>
                    <FaArrowRightArrowLeft />
                    <p>{booking.retourAgence} </p>
                  </div>
                  <div className="date">
                    <p>
                      {new Date(booking.startDate).toLocaleDateString("fr-FR")}
                    </p>
                    <FaArrowRightArrowLeft />
                    <p>
                      {new Date(booking.endDate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <div className="consulterReservation">
                    <button
                      onClick={() =>
                        navigate(`/MesReservation/Reservation/${booking._id}`)
                      }
                    >
                      Consulter la réservation
                    </button>
                  </div>
                </SingleReservationPassees>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                {bookings.message}
              </p>
            )}
          </SectionReservationPassees>
        </Content>
      )}
    </>
  );
}

export default ConsulterReservations;

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertOctagon } from "react-icons/fi";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  svg {
    font-size: 40px;
    color: rgb(232, 38, 38);
  }
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

function LocationEnAttente() {
  const navigate = useNavigate();
  const [reservation, setReservation] = useState([]);
  //get all booking
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!sessionStorage.getItem("token")) {
        return window.location.replace("/login");
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/admin/bookings/allBookings`,
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
          // reservation non confirmée
          const reservationEnAttent = data.bookings.filter(
            (booking) => booking.status === "En-attente"
          );

          setReservation(reservationEnAttent);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container onClick={() => navigate("/admin/locations")}>
      <FiAlertOctagon />
      <p>{reservation?.length || "Aucune"}</p>
      <p>Location en attente</p>
    </Container>
  );
}

export default LocationEnAttente;

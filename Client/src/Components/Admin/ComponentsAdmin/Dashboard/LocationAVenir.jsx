import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEvent } from "react-icons/md";

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
    color: rgb(28, 162, 97);
  }
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

function LocationAVenir() {
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
          // reservation valider a venir
          const reservationValider = data.bookings.filter(
            (booking) => booking.status === "acceptée"
          );

          setReservation(reservationValider);
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
      <MdEvent />
      {reservation?.length || "Aucune"}
      <p>Location à venir</p>
    </Container>
  );
}

export default LocationAVenir;

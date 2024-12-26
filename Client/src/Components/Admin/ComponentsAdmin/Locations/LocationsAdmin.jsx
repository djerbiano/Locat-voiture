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

const Category = styled.div``;
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
const BookingContainer = styled.div`
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
function LocationsAdmin() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [filter, setFilter] = useState({
    status: "",
    email: "",
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
          setOriginalData(data.bookings);
          setReservation(data.bookings);
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

    if (filter.status) {
      filtredData = filtredData.filter((item) => item.status === filter.status);
    }

    if (filter.email) {
      filtredData = filtredData.filter((item) =>
        item.user.email.toLowerCase().includes(filter.email.toLowerCase())
      );
    }

    setReservation(filtredData);
  }, [filter, originalData]);

  return (
    <Container>
      <Title onClick={() => window.location.reload()}>
        <h2>Locations</h2>
        <IoReload />
      </Title>
      <Category>
        <select name="status" id="status" onChange={handleSubmit}>
          <option value="">status</option>
          <option value="En-attente">En-attente</option>
          <option value="acceptée">acceptée</option>
          <option value="refusée">refusée</option>
          <option value="annulée">annulée</option>
          <option value="terminée">terminée</option>
        </select>
      </Category>
      <Search>
        <input
          type="text"
          name="email"
          placeholder="Recherche par email"
          onChange={handleSubmit}
        />
     
      </Search>
      <BookingContainer>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Ville de départ</th>
              <th>Date de départ</th>
              <th>Ville de retour</th>
              <th>Date de retour</th>
              <th>Status</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            {reservation?.length > 0 ? (
              reservation?.map((booking) => (
                <tr key={booking?._id}>
                  <td>{booking?.user?.email}</td>

                  <td>{booking?.departAgence?.replace(/-/g, " ")}</td>

                  <td>
                    {new Date(booking?.startDate)
                      .toLocaleString("fr-FR")
                      .slice(0, 16)
                      .replace(/T/, " ")
                      .replace(/-/g, "/")
                      .replace(":", "H")}
                  </td>

                  <td>{booking?.retourAgence?.replace(/-/g, " ")}</td>

                  <td>
                    {new Date(booking?.endDate)
                      .toLocaleString("fr-FR")
                      .slice(0, 16)
                      .replace(/T/, " ")
                      .replace(/-/g, "/")
                      .replace(":", "H")}
                  </td>

                  <td>{booking?.status}</td>

                  <td
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                    }}
                  >
                    <RiUserSettingsLine style={{ cursor: "pointer" }} onClick={() => navigate(`/admin/locations/SingleLocation/${booking?._id}`)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Aucune location trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </BookingContainer>
    </Container>
  );
}

export default LocationsAdmin;

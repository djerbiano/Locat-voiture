import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateClient from "./UpdateClient";

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

  h2 {
    margin: 20px 0px;
  }
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
const Client = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  p {
    text-transform: capitalize;
  }
  .content {
    padding: 10px;
    width: 100%;
    min-height: 600px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .updateButton {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 100px;
      height: 50px;
      border-radius: 5px;
      border: none;
      padding: 5px;
      background-color: #058d16;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      &:hover {
        background-color: rgb(3, 108, 17);
      }
    }
  }

  .numReservation {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 20px;
    margin: 10px 0px;
    p {
      transition: all 0.2s ease;
      cursor: pointer;
      &:hover {
        color: #c8152c;
        scale: 1.05;
        text-decoration: underline;
      }
    }
  }
`;

function OneClient({ setModalJustClose, setContent }) {
  const { idClient } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const isAdmin = sessionStorage.getItem("isAdmin");

  //get one
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!isAdmin || isAdmin === "false") {
        navigate("/");
        return null;
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/admin/users/oneUser/${idClient}`,
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
          setClient(data);
        } else {
          setModalJustClose(true);
          setContent(data.message);
          console.error(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, [idClient, isAdmin]);

  return updateModal === true ? (
    <UpdateClient
      client={client}
      setUpdateModal={setUpdateModal}
      setModalJustClose={setModalJustClose}
      setContent={setContent}
    />
  ) : (
    <Container>
      <ButtonRetour type="button" onClick={() => navigate(-1)}>
        Retour
      </ButtonRetour>
      <Client>
        <div className="content">
          <h3>Client</h3>
          <br />
          <p>Client ID: {client?._id}</p>
          <p>Nom: {client?.name}</p>
          <p>Prénom: {client?.lastName}</p>
          <p>Email: {client?.email}</p>
          <p>Téléphone: {client?.phone}</p>
          <p>Adresse: {client?.address}</p>
          <p>Admin: {client?.isAdmin ? "Oui" : "Non"}</p>
          <p>
            Inscrit le: {client?.createdAt ? new Date(client?.createdAt).toJSON().slice(0, 16) : "Calcule en cours"}
          </p>
          <p>TokenRestPassword: {client?.tokenRestPassword}</p>
          <p>Nombre de réservaton: {client?.booking?.length}</p>
          <p>Numéros des resservation:</p>
          <div className="numReservation">
            {client?.booking?.map((b) => {
              return (
                <p
                  key={b}
                  onClick={() =>
                    navigate(`/admin/locations/SingleLocation/${b}`)
                  }
                >
                  {b}
                </p>
              );
            })}
          </div>
          <button className="updateButton" type="button" onClick={() => setUpdateModal(true)}>
            Modifier
          </button>
        </div>
      </Client>
    </Container>
  );
}

export default OneClient;

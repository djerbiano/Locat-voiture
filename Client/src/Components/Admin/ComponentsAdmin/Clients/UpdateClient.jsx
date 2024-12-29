import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YesOrNoAdmin from "../../../Modal/YesOrNoAdmin";

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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 15px;
    border: 1px solid black;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    input {
      width: 200px;
      cursor: auto;
    }
    select {
      width: 200px;
      cursor: auto;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonDelete = styled.button`
  min-height: 50px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #c8152c;
  color: white;
  cursor: pointer;
  font-size: 1.3rem;
  align-self: center;
  &:hover {
    background-color: #a50a1e;
  }
`;

const ButtonValider = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  background-color: #058d16;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  &:hover {
    background-color: rgb(3, 108, 17);
  }
`;
function UpdateClient({
  setUpdateModal,
  client,
  setModalJustClose,
  setContent,
}) {
  const { idClient } = useParams();
  const navigate = useNavigate();
  const [modalYesOrNoAdmin, setModalYesOrNoAdmin] = useState(false);
  const [modalYesOrNoAdminContent, setModalYesOrNoAdminContent] = useState("");
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "available" ? value === "true" : value,
    }));
  };

  //update client
  const updateClient = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/admin/users/updateUser/${idClient}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModalJustClose(true);
        setContent(data.message);

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        setModalJustClose(true);
        setContent(data.message);
      }
    } catch (error) {
      console.log(error);
      setModalJustClose(true);
      setContent(error.message);
    }
  };

  //delete client
  const deleteClient = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/admin/users/deleteUser/${idClient}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModalJustClose(true);
        setContent(data.message);
        setUpdateModal(false);
        navigate("/admin/clients");
    
      } else {
        setModalJustClose(true);
        setContent(data.message);
      }
    } catch (error) {
      console.log(error);
      setModalJustClose(true);
      setContent(error.message);
    }
  };
  return modalYesOrNoAdmin ? (
    <YesOrNoAdmin
      setModalYesOrNoAdmin={setModalYesOrNoAdmin}
      functionExcute={deleteClient}
      textContent={modalYesOrNoAdminContent}
    />
  ) : (
    <Container>
      <ButtonRetour type="button" onClick={() => setUpdateModal(false)}>
        Retour
      </ButtonRetour>
      <Form>
        <div className="containterInput">
          <div className="form-input-text">
            <div>
              <label htmlFor="name">Prénom:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />

              <p>*{client?.name}</p>
            </div>
            <div>
              <label htmlFor="lastName">Nom:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
              />
              <p>*{client?.lastName}</p>
            </div>

            <div>
              <label htmlFor="phone">Téléphone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
              />
              <p>*{client?.phone}</p>
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
              />
              <p>*{client?.email}</p>
            </div>

            <div>
              <label htmlFor="address">Adresse:</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleChange}
              />
              <p>*{client?.address}</p>
            </div>

            <div>
              <select name="isAdmin" id="isAdmin" onChange={handleChange}>
                <option value="">Admin</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
              <p>*{client?.isAdmin ? "oui" : "non"}</p>
            </div>

            <div></div>
          </div>
        </div>
        <p>*Valeur actuelle</p>
      </Form>
      <ButtonContainer>
        <ButtonValider type="button" onClick={updateClient}>
          Valider
        </ButtonValider>
        <ButtonDelete
          type="button"
          onClick={() => {
            setModalYesOrNoAdmin(true);
            setModalYesOrNoAdminContent(
              "Êtes-vous sûr de vouloir supprimer ce compte ?"
            );
          }}
        >
          Supprimer le compte
        </ButtonDelete>
      </ButtonContainer>
    </Container>
  );
}

export default UpdateClient;

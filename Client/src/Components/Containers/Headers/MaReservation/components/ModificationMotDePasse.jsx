import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  form {
    min-width: 25vw;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    background-color: #ffffff7a;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="submit"] {
    height: 50px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.2s ease;
    &:hover {
      background-color: #3e8e41;
    }
  }
`;

function ModificationMotDePasse({ setLoading, setModalJustClose, setContent }) {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    token,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // validation du nouveau mot de passe
  const validatePassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setModalJustClose(true);
      setContent("Les mots de passe ne correspondent pas!");
      setFormData({ password: "", confirmPassword: "" });
      return;
    }
    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/auth/reset-password-validate/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    setModalJustClose(true);
    setContent(data.message);

    setFormData({
      token: "",
      password: "",
      confirmPassword: "",
    });

    if(response.status === 200){
      setTimeout(() => {
        window.location.replace("/");
      } , 2000);
    }

    setLoading(false);
  };

  return (
    <Container>
      <form onSubmit={validatePassword}>
        <p
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => window.location.replace("/MesReservation")}
        >
          Retour
        </p>
        <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          Modification du mot de passe:
        </p>

        <input
          type="password"
          name="password"
          placeholder="Nouveau mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le nouveau mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Modifier" />
      </form>
    </Container>
  );
}

export default ModificationMotDePasse;

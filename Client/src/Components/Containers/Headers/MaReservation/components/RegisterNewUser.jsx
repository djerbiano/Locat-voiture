import React, { useState } from "react";
import styled from "styled-components";

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

function RegisterNewUser({ setLoading, setModalJustClose, setContent }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // register new user
  const registerNewUser = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModalJustClose(true);
      setContent("Les mots de passe ne correspondent pas!");
      return;
    }

    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
        }),
      }
    );

    const data = await response.json();

    setModalJustClose(true);

    if (data.message) {
      setContent(data.message);
      setLoading(false);
      return;
    }

    if (data[0].message) {
      setContent(data[0].message);
      setFormData({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
      setLoading(false);
      return;
    }
  };

  return (
    <Container>
      <form onSubmit={registerNewUser}>
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
        <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Inscription:</p>
        <label htmlFor="name">Prénom</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Prénom"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Téléphone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="address">Adresse</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Adresse"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input type="submit" value="S'inscrire" />
      </form>
    </Container>
  );
}

export default RegisterNewUser;

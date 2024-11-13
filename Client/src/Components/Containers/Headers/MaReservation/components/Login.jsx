import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  width: 300px;
  min-width: 30%;
  min-height: 300px;
  background-color: #ffffff7a;
  border-radius: 10px;
  color: black;
  font-size: 1.2rem;

  input[type="submit"] {
    height: 50px;
    margin-top: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.2s ease;
    margin: auto;
    &:hover {
      background-color: #3e8e41;
    }
  }
`;

const ForgotPassword = styled.p`
  margin-top: 20px;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
    transition: all 0.2s ease;
    color: red;
    cursor: pointer;
  }
`;

function Login() {
  const [forgotPassword, setForgotPassword] = useState(true);
  const [formData, setFormData] = useState({
    numeroReservation: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
  };
  return (
    <Container>
      {forgotPassword ? (
        <>
          <p style={{ fontSize: "2rem", marginBottom: "20px" }}>Réservation:</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="numeroReservation">Numéro de réservation:</label>

            <input
              type="text"
              id="numeroReservation"
              name="numeroReservation"
              placeholder="Numero de reservation"
              value={formData.numeroReservation}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input type="submit" value="Connexion" />
          </form>
          <ForgotPassword onClick={() => setForgotPassword(false)}>
            Vous avez oublié votre mot de passe ?
          </ForgotPassword>
        </>
      ) : (
        <>
          <p style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Récupérer vos données:
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="numeroReservation">Numéro de réservation:</label>
            <input
              type="text"
              id="numeroReservation"
              name="numeroReservation"
              placeholder="Numero de reservation"
              value={formData.numeroReservation}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input type="submit" value="Envoyer" />
          </form>
        </>
      )}
    </Container>
  );
}

export default Login;

import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  width: 300px;
  min-width: 30%;
  min-height: 200px;
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

const RegisterCompte = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
    transition: all 0.2s ease;
    color: red;
    cursor: pointer;
  }
`;

function Login({ setLoading, setModalJustClose, setContent }) {
  const [forgotPassword, setForgotPassword] = useState(true);
  const [formData, setFormData] = useState({
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
  
  // login
  const login = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (data.length >= 3) {
      sessionStorage.setItem("token", data[2].token);
      sessionStorage.setItem("userId", data[1]._id);
      sessionStorage.setItem("email", data[1].email);
      sessionStorage.setItem("name", data[1].name);
      sessionStorage.setItem("lastName", data[1].lastName);
      sessionStorage.setItem("phone", data[1].phone);
      sessionStorage.setItem("address", data[1].address);
      sessionStorage.setItem("isAdmin", data[1].isAdmin);

      window.location.reload();
    } else {
      setModalJustClose(true);
      setContent(data.message);
      setLoading(false);
    }
  };

  // forgot password

  const forgotPasswordd = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/auth/reset-password-send-link/${formData.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      }
    );

    const data = await response.json();

    setModalJustClose(true);
    setContent(data.message);
    setFormData({ email: "" });
    setLoading(false);
  };

  return (
    <Container>
      {forgotPassword ? (
        <>
          <p style={{ fontSize: "2rem", marginBottom: "20px" }}>Connexion:</p>
          <form onSubmit={login}>
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

          <RegisterCompte to="/Creation-de-compte">
            Créer un compte ?
          </RegisterCompte>
        </>
      ) : (
        <>
          <p
            style={{
              marginBottom: "20px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => window.location.reload()}
          >
            Retour
          </p>

          <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
            Rénitialisation de mot de passe:
          </p>

          <form onSubmit={forgotPasswordd}>
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

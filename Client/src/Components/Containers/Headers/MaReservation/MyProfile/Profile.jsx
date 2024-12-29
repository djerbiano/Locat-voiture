import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../Context/AuthContext.js";
import { handleErrorInvalidToken } from "../../../../../utils/helper.js";
import { BiShowAlt } from "react-icons/bi";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;

  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PictureContainer = styled.div`
  max-width: 40%;
  padding: 20px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: black;
  margin-top: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  background-color: #ffffffc2;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 630px) {
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .icon {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
      fill: #2e2f33;
    }
  }

  p {
    width: 100%;
    word-break: break-all;
    text-transform: capitalize;
  }
`;
const InfoContainer = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  color: black;
  margin-bottom: 10px;
  @media (max-width: 630px) {
    width: 100%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      label {
        width: 100%;
        font-size: 1.2rem;
      }
      input {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
      }
    }
    .password {
      flex-direction: row;
      width: 100%;
      position: relative;

      svg {
        cursor: pointer;
        font-size: 2rem;
        fill: black;
        transition: fill 0.2s ease;
        &:hover {
          fill: #c8152c;
        }
      }

      > :last-child {
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
      }
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
`;

function Profile({ setLoading, setModalJustClose, setContent }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  //get user infos
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const idUser = sessionStorage.getItem("userId");
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/auth/user/${idUser}`,
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const data = await response.json();

        handleErrorInvalidToken(data.message);

        if (response.ok) {
          setProfile(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
        setModalJustClose(true);
        setContent("Erreur lors de la récupération des informations");
      }
    };

    getUser();
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  //update profile
  const updateProfile = async (e) => {
    e.preventDefault();
    const allFieldsEmpty = Object.values(formData).every(
      (value) => value.trim() === ""
    );

    if (allFieldsEmpty) {
      setModalJustClose(true);
      setContent("Veuillez remplir au moins un champ");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/auth/update/${profile.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      handleErrorInvalidToken(data.message);
      setLoading(false);
      setModalJustClose(true);
      setContent(data.message);
      setFormData({
        name: "",
        lastName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      setModalJustClose(true);
      setContent("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <>
      {isAuthenticated === "true" && (
        <Container>
          <PictureContainer>
            <div className="icon">
              <FaUserEdit />
            </div>
            <div className="infos">
              <p>Nom: {profile?.lastName}</p>
              <p>Prénom: {profile?.name}</p>
              <p>Téléphone: {profile?.phone}</p>
              <p>Email: {profile?.email}</p>
              <p>Email: {profile?.address}</p>
            </div>
          </PictureContainer>
          <InfoContainer>
            <h2 style={{ textAlign: "center" }}>Modifier votre profil</h2>
            <form onSubmit={updateProfile}>
              <div>
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="name">Prénom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre prénom"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Votre téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Votre adresse"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe</label>
                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                  <BiShowAlt onClick={() => setShowPassword(!showPassword)} />
                </div>
              </div>

              <button type="submit">Enregistrer les modifications</button>
            </form>
          </InfoContainer>
        </Container>
      )}
    </>
  );
}

export default Profile;

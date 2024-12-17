import IndexHeaders from "./Components/Containers/Headers/IndexHeaders.jsx";
import IndexMain from "./Components/Containers/Main/IndexMain.jsx";
import IndexFooter from "./Components/Containers/Footer/IndexFooter.jsx";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import styled from "styled-components";
import NotFound404 from "./Components/others/NotFound404.jsx";
import Voitures from "./Components/Containers/Headers//Voitures/Voitures.jsx";
import Tarifs from "./Components/Containers/Headers/Tarifs/Tarifs.jsx";
import Contact from "./Components/Containers/Headers/Contact/Contact.jsx";
import MesReservation from "./Components/Containers/Headers/MaReservation/MesReservations.jsx";
import MentionsLegales from "./Components/Containers/Footer/MentionsLegales.jsx";
import PolitiqueDeConfidentialite from "./Components/Containers/Footer/PolitiqueDeConfidentialite.jsx";
import PolitiqueDeCookies from "./Components/Containers/Footer/PolitiqueDeCookies.jsx";
import ConditionsGeneralesDutilisation from "./Components/Containers/Footer/ConditionsGeneralesDutilisation.jsx";
import ConditionsGeneralesDeLocation from "./Components/Containers/Footer/ConditionsGeneralesDeLocation.jsx";
import SingleReservation from "./Components/Containers/Headers/MaReservation/components/SingleReservation.jsx";
import Reserver from "./Components/Containers/Paiement/Reserver.jsx";
import RegisterNewUser from "./Components/Containers/Headers/MaReservation/components/RegisterNewUser.jsx";
import ModificationMotDePasse from "./Components/Containers/Headers/MaReservation/components/ModificationMotDePasse.jsx";
import Loader from "./Components/others/Loader.jsx";
import JusteClose from "./Components/Modal/JusteClose.jsx";
import Profile from "./Components/Containers/Headers/MaReservation/MyProfile/Profile.jsx";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [modalJustClose, setModalJustClose] = useState(false);
  const [content, setContent] = useState("");
  // voiture chercher par le user (adapter la page voiture en fonction, si true, trouver les cars en fonction de la data saisie sinon afficher tous les cars)
  const [searchCar, setSearcherCar] = useState(false);
  const [searchCarData, setSearcherCarData] = useState({});

  useEffect(() => {
    if (loading || modalJustClose) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading, modalJustClose]);
  const handleStorageChange = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  // gestion de la fermeture de l'authentification
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AppContainer>
      {loading && <Loader />}
      {modalJustClose && (
        <JusteClose setModalJustClose={setModalJustClose} content={content} />
      )}

      <BrowserRouter>
        <AuthProvider>
          <IndexHeaders setSearcherCar={setSearcherCar} />
          <Routes>
            <Route
              path="/"
              element={
                <IndexMain
                  setLoading={setLoading}
                  setSearcherCar={setSearcherCar}
                  setSearcherCarData={setSearcherCarData}
                />
              }
            />
            <Route
              path="/Voitures"
              element={
                <Voitures
                  setLoading={setLoading}
                  searchCar={searchCar}
                  searchCarData={searchCarData}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                  
                />
              }
            />
            <Route
              path="/Tarifs"
              element={<Tarifs setLoading={setLoading} />}
            />
            <Route
              path="/Contact"
              element={
                <Contact
                  setLoading={setLoading}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                />
              }
            />
            <Route
              path="/Creation-de-compte"
              element={
                <RegisterNewUser
                  setLoading={setLoading}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                />
              }
            />
            <Route
              path="/changement-mot-de-passe/:token"
              element={
                <ModificationMotDePasse
                  setLoading={setLoading}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                />
              }
            />
            <Route
              path="/MesReservation"
              element={
                <MesReservation
                  setLoading={setLoading}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                />
              }
            />
            <Route
              path="/MesReservation/Reservation/:idBooking"
              element={
                <SingleReservation
                  setLoading={setLoading}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                />
              }
            />
            <Route
              path="/Profile"
              element={
                <Profile
                  setLoading={setLoading}
                  setModalJustClose={setModalJustClose}
                  setContent={setContent}
                />
              }
            />
            <Route
              path="/Reserver"
              element={<Reserver setLoading={setLoading} setModalJustClose={setModalJustClose}
              setContent={setContent} />}
            />
            <Route
            path="/Reserver/:id"
            element={<Reserver setLoading={setLoading} setModalJustClose={setModalJustClose}
            setContent={setContent} />}
          />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route
              path="/politique-de-confidentialite"
              element={<PolitiqueDeConfidentialite />}
            />
            <Route
              path="/politique-de-cookies"
              element={<PolitiqueDeCookies />}
            />
            <Route
              path="/conditions-generales-d-utilisation"
              element={<ConditionsGeneralesDutilisation />}
            />
            <Route
              path="/conditions-generales-de-location"
              element={<ConditionsGeneralesDeLocation />}
            />

            <Route path="*" element={<NotFound404 />} />
          </Routes>
          <IndexFooter />
        </AuthProvider>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

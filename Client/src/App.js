import IndexHeaders from "./Components/Containers/Headers/IndexHeaders.jsx";
import IndexMain from "./Components/Containers/Main/IndexMain.jsx";
import IndexFooter from "./Components/Containers/Footer/IndexFooter.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import NotFound404 from "./Components/others/NotFound404.jsx";
import Voitures from "./Components/Containers/Headers//Voitures/Voitures.jsx";
import Tarifs from "./Components/Containers/Headers/Tarifs/Tarifs.jsx";
import Contact from "./Components/Containers/Headers/Contact/Contact.jsx";
import MaReservation from "./Components/Containers/Headers/MaReservation/MaReservation.jsx";
import MentionsLegales from "./Components/Containers/Footer/MentionsLegales.jsx";
import PolitiqueDeConfidentialite from "./Components/Containers/Footer/PolitiqueDeConfidentialite.jsx";
import PolitiqueDeCookies from "./Components/Containers/Footer/PolitiqueDeCookies.jsx";
import ConditionsGeneralesDutilisation from "./Components/Containers/Footer/ConditionsGeneralesDutilisation.jsx";
import ConditionsGeneralesDeLocation from "./Components/Containers/Footer/ConditionsGeneralesDeLocation.jsx";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <IndexHeaders />
        <Routes>
          <Route path="/" element={<IndexMain />} />
          <Route path="/Voitures" element={<Voitures />} />
          <Route path="/Tarifs" element={<Tarifs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/MaReservation" element={<MaReservation />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
          <Route path="/politique-de-cookies" element={<PolitiqueDeCookies />} />
          <Route path="/conditions-generales-d-utilisation" element={<ConditionsGeneralesDutilisation />} />
          <Route path="/conditions-generales-de-location" element={<ConditionsGeneralesDeLocation />} />

          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <IndexFooter />
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

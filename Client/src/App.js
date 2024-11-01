import IndexHeaders from "./Components/Containers/Headers/indexHeaders.jsx";
import IndexMain from "./Components/Containers/Main/indexMain.jsx";
import IndexFooter from "./Components/Containers/Footer/indexFooter.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <IndexHeaders />
        <Routes>
          <Route path="/" element={<IndexMain />} />
        </Routes>
        <IndexFooter />
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

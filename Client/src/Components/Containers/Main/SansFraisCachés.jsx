import styled from "styled-components";
import { FaEuroSign } from "react-icons/fa6";

const Frais = styled.div`
  height: 300px;
  width: 400px;
  margin: 20px;
  border-radius: 0px 50px 0px 50px;
  box-shadow: 0px 0px 10px white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .icon {
    font-size: 3em;
    color: #96d900;
    margin-bottom: 10px;
  }

  @media (max-width: 750px) {
    width: 70vw;
    transition: all 0.2s ease;
  }

  p {
    margin: 0px 20px;
    font-size: 1.1em;
    text-transform: uppercase;
    transition: all 0.2s ease;
  }
`;
function SansFraisCachés({ setModalContent, setModalJustClose }) {
  const modalContent =
    "Louez en toute confiance avec notre politique de transparence totale : aucun frais caché ne viendra alourdir votre facture. " +
    "Nos tarifs incluent toutes les taxes et assurances pour une clarté maximale. " +
    "Vous payez exactement le montant indiqué lors de votre réservation, sans mauvaises surprises. " +
    "Notre engagement : des prix clairs et des services honnêtes pour un voyage sans stress.";
  return (
    <Frais
      onClick={() => {
        setModalContent(modalContent);
        setModalJustClose(true);
      }}
    >
      <div className="icon">
        <FaEuroSign />
      </div>
      <p>Sans frais cachés</p>
    </Frais>
  );
}

export default SansFraisCachés;

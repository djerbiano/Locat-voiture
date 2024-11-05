
import styled from "styled-components";

const HeaderContainer = styled.div`
   width: 100%;
   height: 10vh;
   display: flex;
   justify-content: space-around;
   align-items: center;
 
`;
function IndexHeaders() {
  return (
    <HeaderContainer>

    <div className="Acceuil">Acceuil</div>
    <div className="Voitures">Voitures</div>
    <div className="Tarifs">Tarifs</div>
    <div className="Contact">Contact</div>
    <div className="A-propos">A propos</div>

    
    
    </HeaderContainer>
  )
}

export default IndexHeaders
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    min-width: 10%;
    background-color: #181c1d;
    box-shadow: 1px 1px 20px 0px rgb(248 251 255);

    color: white;
    padding: 10px;
    border-radius: 10px;
    fieldset {
      width: 100%;
      border: none;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      border-radius: 10px;
      padding: 10px;
    }

    input {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid gray;
      margin-top: 5px;
      padding: 0 10px;
      font-size: 14px;
    }

    p {
      margin: 5px;
      font-size: 20px;
    }
  }
`;

const ButtonForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 0;

  button {
    border: none;
    border-radius: 5px;
    background-color: green;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    margin: 10px;
    width: 100px;
    height: 40px;
    &:hover {
      background-color: rgba(0, 128, 0, 0.8);
      transition: all 0.5s ease;
    }
  }

  .annuler {
    background-color: red;
    &:hover {
      background-color: rgba(255, 0, 0, 0.8);
      transition: all 0.5s ease;
    }
  }
`;

function CreditCard({
  setPayement,
  setLoading,
  setModalJustClose,
  setContent,
  validatePayement,
}) {
  const navigate = useNavigate();


  const handlePayment = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/bookings/registerBooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify(validatePayement),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setModalJustClose(true);
        setContent(data.message);
        setLoading(false);
      } else {
        setPayement(false);
        setModalJustClose(true);
        setContent(data.message);
        setLoading(false);
        navigate("/MesReservation");
      }
    } catch (error) {
      console.error("Error register booking:", error);
      setLoading(false);
      setModalJustClose(true);
      setContent("Erreur lors du paiement");
    }
  };
  
  return (
    <Container>
      <Content>
        <form>
          <p>Paiement sécurisé par carte</p>

          <fieldset>
            <section>
              <div>
                <label htmlFor="CardNumber">Numéro de carte</label>
              </div>

              <div>
                <input
                  id="CardNumber"
                  name="CardNumber"
                  placeholder="0000 0000 0000 0000"
                  type="tel"
                />
              </div>

              <div>
                <label htmlFor="DateExp">Date d'expiration</label>
              </div>
              <div>
                <input
                  id="DateExp"
                  name="DateExp"
                  placeholder="MM / YY"
                  type="tel"
                />
              </div>

              <div>
                <div>
                  <label htmlFor="SecurityNumber">CVV</label>
                </div>
                <div>
                  <input
                    id="SecurityNumber"
                    name="SecurityNumber"
                    placeholder="***"
                    type="tel"
                  />
                </div>
              </div>
            </section>

            <div>
              <label htmlFor="CardOwner">Titulaire de la carte</label>
            </div>
            <div>
              <input
                id="CardOwner"
                name="CardOwner"
                type="text"
                placeholder="Titulaire de la carte"
              />
            </div>

            <ButtonForm>
              <button type="button" onClick={handlePayment}>
                Payer
              </button>
              <button
                type="button"
                className="annuler"
                onClick={() => setPayement(false)}
              >
                Annuler
              </button>
            </ButtonForm>
          </fieldset>
        </form>
      </Content>
    </Container>
  );
}

export default CreditCard;

import styled from "styled-components";
import { useState, useEffect } from "react";
import VoituresTarifs from "./VoituresTarifs";
const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: black;
  margin-bottom: 10px;
`;

const CarList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(46, 47, 51, 1) 18%,
      rgba(200, 21, 44, 1) 100%
    );
    border-radius: 10px;
  }

  > * {
    flex: 0 0 300px;
    background-color: #2e2f33;
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

function Tarifs({ setLoading, setModalJustClose, setContent }) {
  const [car, setCar] = useState([]);

  useEffect(() => {
    setLoading(true);

    const getCars = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/cars/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.cars?.length > 0) {
          setCar(data.cars);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
        setModalJustClose(true);
        setContent("Erreur lors de la récupération des voitures");
      }
    };

    getCars();

    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <Section>
        <SectionTitle>Économique</SectionTitle>
        <CarList>
          {car?.map((item) =>
            item.category === "Économique" ? <VoituresTarifs key={item._id} car={item} /> : null
          )}
        </CarList>
      </Section>

      <Section>
        <SectionTitle>Intermédiaire</SectionTitle>
        <CarList>
        {car?.map((item) =>
          item.category === "Intermédiaire" ? <VoituresTarifs key={item._id} car={item} /> : null
        )}
        </CarList>
      </Section>

      <Section>
        <SectionTitle>Premium</SectionTitle>
        <CarList>
        {car?.map((item) =>
          item.category === "Premium" ? <VoituresTarifs key={item._id} car={item} /> : null
        )}
        </CarList>
      </Section>
    </Container>
  );
}

export default Tarifs;

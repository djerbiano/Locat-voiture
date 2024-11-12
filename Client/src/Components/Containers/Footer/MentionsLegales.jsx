import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #2e2f33;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2e2f33;
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;
function MentionsLegales() {
  return (
    <Container>
      <Title>Mentions Légales</Title>

      <Section>
        <SectionTitle>Éditeur du Site</SectionTitle>
        <Paragraph>
          Le présent site est édité par **Loca-voiture**, société à
          responsabilité limitée (SARL) au capital de 50,000 €, immatriculée au
          Registre du Commerce et des Sociétés de Paris sous le numéro 000 000
          000.
          <br />
          Siège social : 45 Avenue des Champs-Élysées, 75008 Paris, France.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Responsable de la Publication</SectionTitle>
        <Paragraph>
          Directeur de la publication : Jean Dupond.
          <br />
          Contact : contact@autodrive-location.fr | Téléphone : +33 7 00 00 00
          00.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Hébergement</SectionTitle>
        <Paragraph>
          Le site est hébergé par **OVHcloud**, situé au 2 Rue Kellermann, 59100
          Roubaix, France.
          <br />
          Téléphone : +33 1 00 00 00 00.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Propriété Intellectuelle</SectionTitle>
        <Paragraph>
          Tous les contenus présents sur ce site (textes, images, logos, etc.)
          sont la propriété exclusive de Loca-voiture. Toute reproduction,
          représentation, modification, publication, adaptation de tout ou
          partie des éléments du site, quel que soit le moyen ou le procédé
          utilisé, est interdite, sauf autorisation écrite préalable de
          Loca-voiture.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Limitation de Responsabilité</SectionTitle>
        <Paragraph>
          Loca-voiture ne saurait être tenue pour responsable des dommages
          directs ou indirects causés au matériel de l'utilisateur, lors de
          l'accès au site, et résultant soit de l'utilisation d'un matériel ne
          répondant pas aux spécifications indiquées, soit de l'apparition d'un
          bug ou d'une incompatibilité.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Protection des Données Personnelles</SectionTitle>
        <Paragraph>
          Les informations recueillies sur ce site sont enregistrées dans un
          fichier informatisé par Loca-voiture pour la gestion des
          clients. Elles sont conservées pendant une durée de 3 ans et sont
          destinées uniquement à Loca-voiture. Conformément à la loi
          "Informatique et Libertés", vous pouvez exercer votre droit d'accès
          aux données vous concernant et les faire rectifier en contactant :
          dpo@autodrive-location.fr.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Cookies</SectionTitle>
        <Paragraph>
          Le site Loca-voiture peut être amené à vous demander
          l'acceptation des cookies pour des besoins de statistiques et
          d'affichage. Un cookie est une information déposée sur votre disque
          dur par le serveur du site que vous visitez. Vous avez la possibilité
          de désactiver les cookies en accédant aux paramètres de votre
          navigateur.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Litiges</SectionTitle>
        <Paragraph>
          Les présentes conditions du site Loca-voiture sont régies par
          les lois françaises. En cas de litige, et après échec de toute
          tentative de recherche d'une solution amiable, les tribunaux français
          seront seuls compétents pour connaître de ce litige.
        </Paragraph>
      </Section>
    </Container>
  );
}

export default MentionsLegales;

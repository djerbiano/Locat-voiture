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
  text-align: justify;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

function PolitiqueDeConfidentialite() {
  return (
    <Container>
      <Title>Politique de Confidentialité</Title>

      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          Loca-voiture s'engage à protéger votre vie privée. Cette
          politique de confidentialité explique comment nous collectons,
          utilisons et protégeons vos informations personnelles lorsque vous
          utilisez notre site.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Données Collectées</SectionTitle>
        <Paragraph>Nous collectons les informations suivantes :</Paragraph>
        <List>
          <ListItem>Nom, prénom, adresse e-mail, numéro de téléphone</ListItem>
          <ListItem>
            Informations de paiement (pour le traitement des réservations)
          </ListItem>
          <ListItem>
            Historique des réservations et des interactions avec notre service
          </ListItem>
          <ListItem>
            Adresses IP, type de navigateur, et données de connexion pour
            l'analyse statistique
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Utilisation des Données</SectionTitle>
        <Paragraph>Les informations collectées sont utilisées pour :</Paragraph>
        <List>
          <ListItem>Gérer vos réservations et fournir nos services</ListItem>
          <ListItem>Améliorer notre site et nos services</ListItem>
          <ListItem>
            Vous envoyer des communications promotionnelles avec votre
            consentement
          </ListItem>
          <ListItem>Assurer la sécurité de notre site web</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Partage des Données</SectionTitle>
        <Paragraph>
          Loca-voiture ne partage pas vos données personnelles avec des
          tiers, sauf dans les cas suivants :
        </Paragraph>
        <List>
          <ListItem>
            Avec des prestataires de services pour le traitement des paiements
          </ListItem>
          <ListItem>
            Pour se conformer à la loi ou répondre à des procédures judiciaires
          </ListItem>
          <ListItem>
            En cas de fusion, acquisition ou vente de la société
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Protection des Données</SectionTitle>
        <Paragraph>
          Nous mettons en œuvre des mesures de sécurité techniques et
          organisationnelles pour protéger vos données contre l'accès non
          autorisé, la divulgation, la modification ou la destruction.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Conservation des Données</SectionTitle>
        <Paragraph>
          Vos données personnelles sont conservées pendant une période de 3 ans
          après votre dernière interaction avec notre service, sauf si une durée
          de conservation plus longue est requise ou permise par la loi.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Vos Droits</SectionTitle>
        <Paragraph>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </Paragraph>
        <List>
          <ListItem>Droit d'accès à vos données</ListItem>
          <ListItem>Droit de rectification des informations inexactes</ListItem>
          <ListItem>
            Droit à l'effacement de vos données (droit à l'oubli)
          </ListItem>
          <ListItem>Droit d'opposition au traitement de vos données</ListItem>
        </List>
        <Paragraph>
          Pour exercer ces droits, veuillez nous contacter à :
          dpo@autodrive-location.fr.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Cookies</SectionTitle>
        <Paragraph>
          Notre site utilise des cookies pour améliorer votre expérience
          utilisateur. Vous pouvez configurer votre navigateur pour refuser tous
          les cookies ou pour vous alerter lorsqu'un cookie est envoyé. Notez
          que certaines parties de notre site pourraient ne pas fonctionner
          correctement si vous désactivez les cookies.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Modifications de la Politique</SectionTitle>
        <Paragraph>
          Loca-voiture se réserve le droit de modifier cette politique de
          confidentialité à tout moment. Toute modification sera publiée sur
          cette page, et nous vous encourageons à consulter régulièrement notre
          politique pour rester informé de la manière dont nous protégeons vos
          informations.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <Paragraph>
          Pour toute question ou préoccupation concernant cette politique de
          confidentialité, vous pouvez nous contacter par e-mail à
          contact@autodrive-location.fr ou par courrier à :
          <br />
          Loca-voiture, 45 Avenue des Champs-Élysées, 75008 Paris, France.
        </Paragraph>
      </Section>
    </Container>
  );
}

export default PolitiqueDeConfidentialite;

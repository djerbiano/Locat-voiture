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
  padding-left: 20px;
  font-size: 1rem;
  list-style-type: none;
`;
function ConditionsGeneralesDeLocation() {
  return (
    <Container>
      <Title>Conditions Générales de Location</Title>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          Les présentes conditions générales de location régissent la location
          de véhicules par le biais du site Loca-voiture. En réservant un
          véhicule sur notre site, vous acceptez ces conditions sans réserve.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Processus de Réservation</SectionTitle>
        <Paragraph>
          La réservation de véhicule se fait exclusivement en ligne via notre
          site. Le client doit fournir les informations suivantes :
        </Paragraph>
        <List>
          <li>Nom, prénom et coordonnées de contact</li>
          <li>Informations de paiement pour la réservation</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. Modalités de Location</SectionTitle>
        <Paragraph>
          Les véhicules sont disponibles à la location pour des périodes
          déterminées, selon les tarifs affichés sur le site. La location
          commence et se termine aux dates spécifiées dans la réservation.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Obligations du Locataire</SectionTitle>
        <Paragraph>
          Le locataire s'engage à respecter les conditions suivantes :
        </Paragraph>
        <List>
          <li>Présenter un permis de conduire valide</li>
          <li>Avoir un âge minimum de 21 ans pour louer un véhicule</li>
          <li>Ne pas sous-louer le véhicule à un tiers</li>
          <li>Retourner le véhicule dans les délais et l'état convenus</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Prix et Paiement</SectionTitle>
        <Paragraph>
          Les tarifs de location sont indiqués sur le site et incluent les frais
          de location de base ainsi que les assurances obligatoires. Des frais
          supplémentaires peuvent s'appliquer en cas de retour tardif ou de
          dommage au véhicule.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Responsabilité du Locataire</SectionTitle>
        <Paragraph>
          Le locataire est responsable du véhicule pendant toute la durée de la
          location. Il doit veiller à :
        </Paragraph>
        <List>
          <li>Garer le véhicule dans des endroits sécurisés</li>
          <li>Assurer la protection du véhicule contre tout dommage</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>7. Assurance</SectionTitle>
        <Paragraph>
          Loca-voiture fournit une couverture de base, mais le locataire
          peut souscrire une assurance complémentaire pour réduire la franchise
          en cas d'accident ou de dommage.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. Annulation et Modifications</SectionTitle>
        <Paragraph>
          Les annulations doivent être effectuées au moins 48 heures avant la
          date de location pour être éligibles à un remboursement complet. Des
          frais peuvent s'appliquer en cas d'annulation tardive.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. Retour du Véhicule</SectionTitle>
        <Paragraph>
          Le véhicule doit être retourné dans l'état dans lequel il a été reçu,
          avec tous les équipements fournis (clés, documents, etc.). En cas de
          retard ou de dommages, des frais supplémentaires seront appliqués.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>10. Modifications des Conditions</SectionTitle>
        <Paragraph>
          Loca-voiture se réserve le droit de modifier ces conditions
          générales de location à tout moment. Les modifications seront publiées
          sur notre site et entreront en vigueur dès leur publication.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>11. Loi Applicable et Juridiction</SectionTitle>
        <Paragraph>
          Ces conditions générales sont régies par la législation française. En
          cas de litige, seul le tribunal compétent de Paris pourra être
          sollicité.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>12. Contact</SectionTitle>
        <Paragraph>
          Pour toute question relative aux conditions générales de location,
          veuillez nous contacter par e-mail à contact@autodrive-location.fr ou
          par téléphone au +33 7 00 00 00 00.
        </Paragraph>
      </Section>
    </Container>
  );
}

export default ConditionsGeneralesDeLocation;

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

function ConditionsGeneralesDutilisation() {
  return (
    <Container>
      <Title>Conditions Générales d'Utilisation</Title>

      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          Les présentes conditions générales d'utilisation (CGU) régissent
          l'accès et l'utilisation du site Loca-voiture. En accédant à ce
          site, vous acceptez sans réserve les présentes conditions. Si vous ne
          les acceptez pas, veuillez cesser d'utiliser notre site.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Accès au Site</SectionTitle>
        <Paragraph>
          Le site est accessible 24 heures sur 24, 7 jours sur 7, sauf en cas de
          maintenance ou de force majeure. Loca-voiture ne saurait être
          tenue responsable des interruptions de service, des bugs ou des
          dommages résultant de l'utilisation du site.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Services Proposés</SectionTitle>
        <Paragraph>
          Loca-voiture propose des services de location de voitures en
          ligne. Les informations fournies sur le site sont données à titre
          indicatif et peuvent être modifiées à tout moment sans préavis.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Obligations des Utilisateurs</SectionTitle>
        <Paragraph>
          L'utilisateur s'engage à utiliser le site de manière légale et
          conforme aux présentes CGU. Il s'interdit notamment :
        </Paragraph>
        <List>
          <li>D'utiliser le site à des fins frauduleuses</li>
          <li>De porter atteinte aux droits de propriété intellectuelle</li>
          <li>
            De tenter d'accéder de manière non autorisée aux systèmes du site
          </li>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Propriété Intellectuelle</SectionTitle>
        <Paragraph>
          Tous les contenus du site (textes, images, logos) sont protégés par le
          droit d'auteur et sont la propriété exclusive de Loca-voiture.
          Toute reproduction, même partielle, est strictement interdite sans
          autorisation écrite préalable.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Responsabilité</SectionTitle>
        <Paragraph>
          Loca-voiture décline toute responsabilité en cas de dommages
          directs ou indirects résultant de l'utilisation du site, y compris la
          perte de données ou de profits.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. Protection des Données Personnelles</SectionTitle>
        <Paragraph>
          Conformément au RGPD, Loca-voiture s'engage à protéger la vie
          privée des utilisateurs. Pour plus de détails, veuillez consulter
          notre Politique de Confidentialité.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. Modification des CGU</SectionTitle>
        <Paragraph>
          Loca-voiture se réserve le droit de modifier à tout moment les
          présentes CGU. Les modifications seront applicables dès leur mise en
          ligne sur le site.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. Loi Applicable et Juridiction</SectionTitle>
        <Paragraph>
          Les présentes CGU sont régies par le droit français. En cas de litige,
          et après échec de toute tentative de recherche d'une solution amiable,
          seuls les tribunaux français seront compétents.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>10. Contact</SectionTitle>
        <Paragraph>
          Pour toute question relative aux présentes CGU, veuillez nous
          contacter à l'adresse suivante : contact@autodrive-location.fr.
        </Paragraph>
      </Section>
    </Container>
  );
}

export default ConditionsGeneralesDutilisation;

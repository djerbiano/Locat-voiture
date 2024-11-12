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
function PolitiqueDeCookies() {
  return (
    <Container>
      <Title>Politique de Cookies</Title>

      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          Cette politique de cookies explique comment Loca-voiture utilise
          des cookies et des technologies similaires pour améliorer votre
          expérience en ligne. En utilisant notre site, vous acceptez
          l'utilisation de cookies conformément à cette politique.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Qu'est-ce qu'un Cookie ?</SectionTitle>
        <Paragraph>
          Un cookie est un petit fichier texte stocké sur votre appareil lorsque
          vous visitez un site web. Les cookies nous aident à améliorer les
          fonctionnalités du site, analyser son utilisation, et personnaliser le
          contenu en fonction de vos préférences.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Les Cookies que Nous Utilisons</SectionTitle>
        <Paragraph>Nous utilisons les types de cookies suivants :</Paragraph>
        <List>
          <ListItem>
            <strong>Cookies Essentiels :</strong> Nécessaires pour le
            fonctionnement du site. Ils vous permettent de naviguer sur le site
            et d'utiliser ses fonctionnalités.
          </ListItem>
          <ListItem>
            <strong>Cookies de Performance :</strong> Collectent des
            informations anonymes sur la manière dont les visiteurs utilisent
            notre site pour nous aider à améliorer son fonctionnement.
          </ListItem>
          <ListItem>
            <strong>Cookies de Fonctionnalité :</strong> Permettent de mémoriser
            vos choix (par exemple, votre langue ou région) pour vous fournir
            une expérience plus personnalisée.
          </ListItem>
          <ListItem>
            <strong>Cookies Publicitaires :</strong> Utilisés pour afficher des
            publicités pertinentes en fonction de vos centres d'intérêt.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Gestion des Cookies</SectionTitle>
        <Paragraph>
          Vous pouvez gérer vos préférences en matière de cookies en modifiant
          les paramètres de votre navigateur. Vous avez la possibilité de
          désactiver tous les cookies ou seulement certains types. Cependant,
          veuillez noter que désactiver les cookies essentiels peut affecter la
          fonctionnalité de notre site.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Comment Désactiver les Cookies</SectionTitle>
        <Paragraph>
          La plupart des navigateurs vous permettent de refuser ou d'accepter
          les cookies via leurs paramètres. Pour en savoir plus sur la gestion
          des cookies, consultez les instructions spécifiques à votre navigateur
          :
        </Paragraph>
        <List>
          <ListItem>
            Google Chrome : Paramètres &gt; Confidentialité &gt; Cookies
          </ListItem>
          <ListItem>
            Mozilla Firefox : Options &gt; Vie privée &gt; Cookies
          </ListItem>
          <ListItem>
            Microsoft Edge : Paramètres &gt; Confidentialité &gt; Cookies
          </ListItem>
          <ListItem>
            Safari : Préférences &gt; Confidentialité &gt; Cookies
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Modifications de la Politique de Cookies</SectionTitle>
        <Paragraph>
          Loca-voiture se réserve le droit de mettre à jour cette
          politique de cookies à tout moment. Nous vous encourageons à consulter
          régulièrement cette page pour rester informé des modifications
          éventuelles.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <Paragraph>
          Si vous avez des questions ou des préoccupations concernant notre
          utilisation des cookies, veuillez nous contacter à :
          contact@autodrive-location.fr.
        </Paragraph>
      </Section>
    </Container>
  );
}

export default PolitiqueDeCookies;

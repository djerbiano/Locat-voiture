import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 70vh;
  background-color: #ffffff7a;
  border-radius: 10px;
`;

const Content = styled.div`
  padding: 20px;
  max-width: 600px;
  min-height: 70vh;
  margin: 0 auto;
  border-radius: 10px;
`;
const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  &:focus {
    border-color: black;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
  min-height: 40vh;
  &:focus {
    border-color: black;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #c8152c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  align-self: center;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;
function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    setFormData({ email: "", phone: "", message: "" });
  };

  return (
    <Container>
      <Content>
        <Title>Contactez-nous</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Votre numéro de téléphone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Envoyer</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default Contact;

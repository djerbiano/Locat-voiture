import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
function Contact({ setLoading, setModalJustClose, setContent }) {
  const navigate = useNavigate();
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
// send message from contact page
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/contact/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setModalJustClose(true);
        setContent(data.message);
        setLoading(false);
      } else {
        setFormData({ email: "", phone: "", message: "" });
        setModalJustClose(true);
        setContent(data.message);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      setLoading(false);
      setModalJustClose(true);
      setContent("Une erreur est survenue lors de l'envoi du message");
    }
  };

  return (
    <Container>
      <Content>
        <Title>Contactez-nous</Title>
        <Form>
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
          <Button type="button" onClick={handleSubmit}>
            Envoyer
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default Contact;

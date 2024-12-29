import styled from "styled-components";
import { IoReload } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.1s ease;

    &:hover {
      transform: scale(1.1);
      font-weight: bold;
    }
  }
`;

const Sort = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  select {
    width: 150px;
  }
`;

const Search = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    width: 30%;
  }
`;
const ClientContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;

    th {
      background-color: rgb(255, 251, 251);
      border: 1px solid black;
      padding: 10px;
      text-align: center;
    }

    td {
      padding: 5px;
      border: 1px solid black;
      text-align: left;
    }
  }
`;
function ClientsAdmin() {
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState({
    isAdmin: "",
    email: "",
  });
  
  //handler search
  const handleSubmit = (e) => {
    setFilter((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //get all booking
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!sessionStorage.getItem("token")) {
        return window.location.replace("/login");
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/admin/users/allUsers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setOriginalData(data);
          setUser(data);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //filter data
  useEffect(() => {
    let filtredData = [...originalData];

    if (filter.isAdmin === "true") {
      filtredData = filtredData.filter((item) => item.isAdmin === true);
    } else if (filter.isAdmin === "false") {
      filtredData = filtredData.filter((item) => item.isAdmin === false);
    }

    if (filter.email) {
      filtredData = filtredData.filter((item) =>
        item.email.toLowerCase().includes(filter.email.toLowerCase())
      );
    }

    setUser(filtredData);
  }, [filter, originalData]);

  return (
    <Container>
      <Title onClick={() => window.location.reload()}>
        <h2>Clients</h2>
        <IoReload />
      </Title>
      <Sort>
        <select name="isAdmin" id="isAdmin" onChange={handleSubmit}>
          <option value="">Admin</option>
          <option value="true">oui</option>
          <option value="false">non</option>
        </select>
      </Sort>

      <Search>
        <input
          type="text"
          name="email"
          placeholder="Recherche par email"
          onChange={handleSubmit}
        />
      </Search>
      <ClientContainer>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Admin</th>
              <th>NB réservations</th>
              <th>Inscription</th>

              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            {user?.length > 0 ? (
              user?.map((oneUser) => (
                <tr key={oneUser?._id}>
                  <td>{oneUser?.email}</td>
                  <td>{oneUser?.name}</td>
                  <td>{oneUser?.lastName}</td>
                  <td>{oneUser?.isAdmin ? "oui" : "non"}</td>
                  <td>{oneUser?.booking?.length}</td>
                  <td>
                    {new Date(oneUser?.createdAt)
                      .toLocaleString("fr-FR")
                      .slice(0, 10)}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                    }}
                  >
                    <RiUserSettingsLine
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/clients/SingleClient/${oneUser?._id}`)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: "center" }}>
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ClientContainer>
    </Container>
  );
}

export default ClientsAdmin;

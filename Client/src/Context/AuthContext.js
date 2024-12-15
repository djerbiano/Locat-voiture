import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = sessionStorage.getItem("token");
      const userid = sessionStorage.getItem("userId");

      if (!token || !userid) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/verifInformationSessionStorage`,
        {
          method: "POST",
          headers: {
            token,
            userid,
          },
        }
      );
      const result = await response.json();

      if (result.error === "jwt expired") {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(result.message);
    };

    checkTokenValidity();

    const handleStorageChange = () => {
      checkTokenValidity();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

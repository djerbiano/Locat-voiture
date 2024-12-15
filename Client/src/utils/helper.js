

const handleErrorInvalidToken = (message) => {
    
    if (message === "invalid token") {
        sessionStorage.clear();
        window.location.href = "/MesReservation";
      }
    
  };

  module.exports = { handleErrorInvalidToken };
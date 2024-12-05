export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    window.location.href = "/connexion"; // Redirige vers la page de connexion
  };
  
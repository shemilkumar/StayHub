const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userPhoto");
  localStorage.removeItem("/users/me");
};

export default logout;
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("/users/me");
};

export default logout;
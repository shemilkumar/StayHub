import apiRequest, { FetchChecked } from "../api/apiRequest";

const logout = async(): Promise<boolean> => {
  // localStorage.removeItem("token");
  const response = await apiRequest.get('/users/logout') as FetchChecked;

  if(response.pass){
    localStorage.removeItem("user");
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("/users/me");
    return true;
  }else return false;
};

export default logout;
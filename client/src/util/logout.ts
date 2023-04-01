import apiRequest, { FetchChecked } from "../api/apiRequest";

const logout = async(): Promise<boolean> => {
  const response = await apiRequest.get('/users/logout') as FetchChecked;
  if(response.pass) return true;
  else return false;
};

export default logout;
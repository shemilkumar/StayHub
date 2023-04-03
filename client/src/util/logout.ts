import apiRequest, { FetchChecked } from "../api/apiRequest";

const logout = async(): Promise<boolean> => {
  const response = await apiRequest.get('/users/logout') as FetchChecked;
  if(response.pass){
    localStorage.removeItem('user');
    localStorage.removeItem('userPhoto');
    return true;
  }
  else return false;
};

export default logout;
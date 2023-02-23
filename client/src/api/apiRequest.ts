import axios, { AxiosError, isAxiosError, AxiosResponse } from "axios";
import { axiosApi } from "../Constants/constant";


const apiRequest = async(request:string, url : string, data: object = {}) => {
  try {

    let res: AxiosResponse;
    switch (request) {
      case 'GET':
        res = await axiosApi.get(url);
        break;
      
      case 'POST':
        res = await axiosApi.post(url,data);
        break;

      case 'PATCH':
        res = await axiosApi.patch(url,data);
        break;

      case 'DELETE':
        res = await axiosApi.delete(url);
        break;
    
      default:
        throw new Error("Request is not defined");
    }
    

    if(res.data.status === 'success'){
      return res.data;
    }else alert(res.data.message);
    
  } catch (error ) {
    if (isAxiosError(error)) {
      if(error.response){
        alert(error.response.data.message);
      }else {
        if(error.code === 'ERR_NETWORK') alert("Server is busy or Check your connection");
        throw error;
      }
    }
    else alert(error);
  }
};

export default apiRequest;

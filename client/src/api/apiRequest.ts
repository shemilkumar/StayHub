import axios, {isAxiosError, AxiosResponse, AxiosError } from "axios";
import { axiosApi } from "../Constants/constant";
import { APIResponse } from "../Constants/modelTypes";

export interface FetchChecked{
  pass: boolean,
  message?: string,
  fetchedData?: APIResponse
}

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class apiRequest {

  response: APIResponse | AxiosError | undefined;

  constructor(){
    this.response = undefined;
  };

  async get(url : string){
    try {
      this.response = await axiosApi.get(url) as APIResponse | AxiosError;
      const result = this._checkResponse(this.response) as FetchChecked;
      return result;

    } catch (error){
      return this._internalError(error);
    } 
  }

  async post(url : string, data: object){
    try {
      this.response = await axiosApi.post(url,data) as APIResponse | AxiosError;
      const result = this._checkResponse(this.response) as FetchChecked;
      return result;

    } catch (error){
      return this._internalError(error);
    } 
  }

  async patch(url : string, data: object){
    try {
      this.response = await axiosApi.patch(url,data) as AxiosResponse;
      return this.response;
      
    } catch (error){
      return this._internalError(error);
    } 
  }

  async delete(url : string){
    try {
      this.response = await axiosApi.delete(url) as AxiosResponse;
      return this.response

    } catch (error){
      return this._internalError(error);
    } 
  }

  _internalError(error : unknown){
    if (isAxiosError(error)) {
      if(error.response){
        return {pass : false, message: error.response.data.message};
      }
      else return {pass : false, message: error.message};
    }
    else alert(error);
  }

  _checkResponse(response : typeof this.response){

    if(!response) return;

    if(response instanceof AxiosError){
      if(response.name === 'AxiosError'){
        // navigate(`/error/${response.message}`);
        return {pass : false, message: response.message};
      }
    }else if(response.data.status !== 'success') {
      // navigate(`/error/${response.data.message}`);
      return {pass : false, message: response.data.message};
    }

    return {
      pass: true,
      fetchedData: response
    };

  }

}

export default new apiRequest();

// const apiRequest = async(request:string, url : string, data: object = {}) => {
//   try {

//     let res: AxiosResponse;
//     switch (request) {
//       case 'GET':
//         res = await axiosApi.get(url,{
//           headers: {
//             'Cache-Control': 'max-age=3600'
//           }
//         });
//         break;
      
//       case 'POST':
//         res = await axiosApi.post(url,data);
//         break;

//       case 'PATCH':
//         res = await axiosApi.patch(url,data);
//         break;

//       case 'DELETE':
//         res = await axiosApi.delete(url);
//         break;
    
//       default:
//         throw new Error("Request is not defined");
//     }

//     if(res.data.status === 'success'){
//       return res.data;
//     }else{
//       alert(res.data.message);
//     } 
    
//   } catch (error ) {
//     if (isAxiosError(error)) {
//       if(error.response){
//         console.log(error);
//         alert(error.response.data.message);
//       }else {
//         if(error.code === 'ERR_NETWORK') alert("Server is busy or Check your connection");
//         throw error;
//       }
//     }
//     else alert(error);
//   }
// };


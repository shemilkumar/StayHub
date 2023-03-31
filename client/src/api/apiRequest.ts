import {isAxiosError, AxiosResponse, AxiosError } from "axios";
import { axiosApi } from "../Constants/constant";
import { APIResponse } from "../Constants/modelTypes";

export interface FetchChecked{
  pass: boolean,
  message?: string,
  fetchedData?: APIResponse
  deleted?: boolean
}

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
      const result = this._checkResponse(this.response) as FetchChecked;
      return result

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
    else return {pass : false, message: 'Something went wrong'};
    // else alert(error);
  }

  _checkResponse(response : typeof this.response){

    if(!response) return {pass : false, message: 'Something went wrong'};

    if(response instanceof AxiosError){
      if(response.name === 'AxiosError') return {pass : false, message: response.message};
    }else if(response.status === 204){
      return {
        pass: true,
        deleted: true,
      };
    }else if(response.data.status !== 'success')
      return {pass : false, message: response.data.message};

    return {
      pass: true,
      fetchedData: response
    };
  }

}

export default new apiRequest();


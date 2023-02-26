import { AxiosError } from 'axios';
import { APIResponse } from '../Constants/modelTypes';

const apiErrorCheck = (result : APIResponse | AxiosError): string | APIResponse => {

  if(result instanceof AxiosError){
    if(result.name === 'AxiosError') return (result.message);
    return 'Something went wrong';
  }
  
  if(result.data.status !== 'success') return (result.data.message);

  return result;
}

export default apiErrorCheck;
import { useEffect, useState } from "react";
import { axiosApi } from "../Constants/constant";
import { APIResponse,Data } from "../Constants/modelTypes";

function useApi<T, U>(req: string,endpoint: string, payload?: U): { data: any | null, error: string | null } {

  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const cachingEndpoints: string[] = ['/homes'];
  let hasData:boolean = false;

  const cacheNeedChecking = (endpoint : string) =>{
    return cachingEndpoints.includes(endpoint);
  }

  const settingData = (response : APIResponse) =>{
    if(response.data.status === 'success'){
      setData(response.data);
    }
    else setError(response.data.message);
  }

  useEffect(() => {

    const fetchData = async() =>{

      if(cacheNeedChecking(endpoint) && localStorage.getItem(endpoint)){
        hasData = true;
      }

      if(!hasData && !isFetching){
        setIsFetching(true);

        switch (req) {
          case 'GET':
            try {
              const response = await axiosApi.get(endpoint) as APIResponse;
              settingData(response);

              if(cacheNeedChecking(endpoint))
                localStorage.setItem(endpoint,JSON.stringify(response.data));

            } catch (err:any) {

              if((err.response?.data.message)){
                setError(err.response.data.message); 
                // console.log(error);
              }
              if(err.message === 'Network Error')setError(err.message);

            }
          break;
  
          case 'POST':
              try {
                const response = await axiosApi.post(endpoint,payload) as APIResponse;
                settingData(response);

                if(cacheNeedChecking(endpoint))
                  localStorage.setItem(endpoint,JSON.stringify(response.data));
              } catch (error:any) {
                setError(error.message);
              }
            break;
        
          default:
            break;
        }
      }
      setIsFetching(false);
    }

    fetchData();
  }, [endpoint]);
  
  // console.log(data);
  return {data,error};
}

export default useApi;
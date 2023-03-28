const getMainUrl = ():string => {

  if(process.env.NODE_ENV === 'production')
    return `${process.env.MAIN_URL}`;
  else
    return `http://127.0.0.1:5173`;

}

export default getMainUrl;
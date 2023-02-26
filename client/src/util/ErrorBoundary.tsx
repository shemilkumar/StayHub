import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorBoundary(props : any) {

  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  // function handleOnError(error, errorInfo) {
  //   // Log the error to an error reporting service
  //   console.log("Error occurred: ", error, errorInfo);
  //   setHasError(true);
  // }

  if (hasError) {
    // Render fallback UI when there's an error
    // return <h1>Something went wrong.</h1>;
    navigate('/error');
  }

  // Render the children components as normal
  return <>{props.children}</>;
}

export default ErrorBoundary;

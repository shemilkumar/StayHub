interface Inputs {
  readonly email: string,
  readonly password?: string,
}

type Result = {
  pass : boolean,
  status: string,
  message : string
  prop?: string,
}

const validator = (inputs :Inputs): Result => {

  console.log(inputs);

  if(inputs.email){
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(inputs.email)){
      const result =  {
        pass : false,
        status : 'fail',
        prop: 'email',
        message : 'Invalid email, Please try again with a valid email'
      }
      alert(result.message);
      return result;
    }
  }

  if(inputs.password){
    if(!(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/).test(inputs.password)){
      const result =  {
        pass : false,
        status : 'fail',
        prop: 'password',
        message : 'Password must contain 6 characters, and contain atleast one lowercase,uppercase letter and one digit'
      }
      alert(result.message);
      return result;
    }
  }

  return {
    pass : true,
    status: 'success',
    message :'Validation success'
  }
}

export default validator;
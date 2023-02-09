import Button from "./Elements/Button";
import Input from "./Elements/Input";

function PasswordChange(){
  return(
    <div className='px-16'>
      <h1 className='text-2xl uppercase mb-12 text-secondary font-semibold'>Change Password</h1>
      <form>
        
        <Input id='currentPassword' type='password' label='Current password'/>
        <Input id='newPassword' type='password' label='New password'/>
        <Input id='confirmPassword' type='password' label='Confirm password'/>

        <div className='mt-8 flex justify-end'>
          <Button text='Save Password'/>
        </div>

      </form>
    </div>
  )
}

export default PasswordChange;
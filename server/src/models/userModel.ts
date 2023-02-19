import mongoose,{Document} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';

export interface UserType extends Document{
  name:string,
  email:string,
  photo:string,
  password:string,
  passwordConfirm:string | undefined,
  passwordChangedAt: Date,
  role: string,

  checkPassword: (encryptedPassword:string,password: string) => Promise<boolean>,
  changedPasswordAfter: (JWTTimestamp : number) => boolean,
}

const userSchema = new mongoose.Schema<UserType>(
  {
    name:{
      type:String,
      required:[true,'Please tell us your name'],
      trim:true
    },
    email:{
      type:String,
      required:[true,'Please provide your email'],
      unique:true,
      trim:true,
      lowercase: true,
      validate: [validator.isEmail,'Please provide a valid email']
    },
    photo: String,

    password: {
      type: String,
      required: [true,'Please provide a password'],
      minlength: 6,
      select:false
    },
    passwordConfirm: {
      type: String,
      required: [true,'Please provide a Confirm password'],
      validate:{
        // This only works on CREATE and SAVE
        validator: function(this: UserType, passwordConfirm : string) : boolean{
          return passwordConfirm === this.password
        },
        message: 'Passwords are not same'
      }
    },
    role:{
      type: String,
      enum: ['user','admin'],
      default: 'user'
    },
    passwordChangedAt : Date,
  }
);

userSchema.methods.checkPassword = async function(encryptedPassword:string,password: string){
  return await bcrypt.compare(password,encryptedPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp : number){

  if(this.passwordChangedAt){
    const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(),10);
    return JWTTimestamp < changedTimestamp;
  }

  return false
}

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,12);

  this.passwordConfirm = undefined;
})

const User = mongoose.model<UserType>('User',userSchema);

export default User;
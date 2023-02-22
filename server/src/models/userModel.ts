import mongoose,{Document} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface UserType extends Document{
  name:string,
  email:string,
  photo?:string,
  password:string | undefined,
  passwordConfirm:string | undefined,
  role: string,
  passwordChangedAt?: Date | number,
  passwordResetToken?: string,
  passwordResetExpires?: Date,
  active: boolean,

  checkPassword: (encryptedPassword:string,password: string) => Promise<boolean>,
  changedPasswordAfter: (JWTTimestamp : number) => boolean,
  createPasswordResetToken:() => string,
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
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    passwordChangedAt : Date,
    passwordResetToken : String,
    passwordResetExpires: Date,
  }
);

userSchema.methods.checkPassword = async function(encryptedPassword:string,password: string){
  return await bcrypt.compare(password,encryptedPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp : number){

  if(this.passwordChangedAt){
    const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(),10);
    return JWTTimestamp < changedTimestamp;
  }

  return false
};

userSchema.methods.createPasswordResetToken = function(){

  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken; 
};

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password!,12);

  this.passwordConfirm = undefined;
});

userSchema.pre('save', function(next){
  if(!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/,function(next){
  this.find({active : { $ne : false}});
  next();
})

const User = mongoose.model<UserType>('User',userSchema);

export default User;
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import * as template from "./Templates/template";

class Email{

  to: string;
  from: string;
  url: string;
  firstName: string;

  constructor(user : {name: string, email: string}, url : string){
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `StayHub <${process.env.EMAIL}>`

    // console.log(this.to,this.firstName);
  }

  newTransport(){
    // if(process.env.No)
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  async send(htmlTemplate : string, subject: string){

    let html : string= '';

    if(htmlTemplate === 'welcome'){
      html = (template.welcome).replace('<name>', this.firstName);
    }

    if(htmlTemplate === 'passwordReset'){
      html = (template.passwordResetMail).replace('<URL>', this.url);
    }

    if(htmlTemplate === 'bookingSuccess'){
      html = (template.bookingSuccess).replace('<URL>', this.url).replace('<name>',this.firstName);
    }

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
    }

    await this.newTransport().sendMail(mailOptions);
  };

  async sendWelcome(){
    await this.send('welcome', 'Welcome to the StayHub Family!');
  };

  async sendPasswordReset(){
    await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
  }

  async sendBookingConfirmation(){
    await this.send('bookingSuccess', 'Your booking is confirmed');
  }
}

export default Email;
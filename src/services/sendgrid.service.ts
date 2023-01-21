import { SENDGRID_EMAIL, SENDGRID_API_KEY } from "../config";

class SendgridService {
  private sgMail:any;

  constructor(){
    this.sgMail = require("@sendgrid/mail");
    this.sgMail.setApiKey(SENDGRID_API_KEY);
  }

  public sendPasswordResetToken = async (to:string, token:string) => {
    try{
      await this.sgMail.send({
        to,
        from: SENDGRID_EMAIL,
        subject: "Here's your password reset token",
        test: `email: ${to} passwordResetToken: ${token}`,
        html:`<p>email: ${to}<br/>passwordResetToken: ${token}</p>`,
      });
    } catch (error:any) {
      throw new Error(error);
    }
  };
}

export default SendgridService;
import * as nodemailer from 'nodemailer';
import { SmtpAdapterInterface } from './interfaces/smtpAdapter.interface';

export class SmtpAdapter implements SmtpAdapterInterface {
    public async sendMail(mailOptions: { from: string; to: string; subject: string; text: string; }): Promise<any> {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: process.env.EMAIL_DAEMON,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: process.env.ACCESS_TOKEN,
          }
        });

        return await transporter.sendMail({
          from:mailOptions.from,
          to:mailOptions.to,
          subject:mailOptions.subject,
          text:mailOptions.text
        });
    }
}

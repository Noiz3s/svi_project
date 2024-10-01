import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class Emailer {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'emmamoshk@gmail.com',
        pass: 'wxpa zwgo dhlo crrg',
      },
    });
  }

  public sendEmail(mailOptions: MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }

  public notifyUserForOrder(email: string) {
    this.sendEmail(newOrderCreated(email));
  }
}

export const emailer = new Emailer();

export const newOrderCreated = (email: string) => {
  return {
    from: 'emmamoshk@gmail.com',
    to: email,
    subject: `Новый заказ на концерт NoMatter`,
    text: 'Вы создали новый заказ',
    html: `
      <h1>Новый заказ</h1>
      <p>Вы создали заказ на наш концерт</p>
      <p></p>
      <p>Чтобы отменить заказ заполните <a href="">заявление</a> и загрузите заполненное заявление в <a href="https://docs.google.com/forms/d/e/1FAIpQLSfLgISb5Np5gM5zm_zfKei7DW18yL3RjKofc_vMk8VEEuD_TQ/viewform?usp=sharing">форму</a></p>
    `,
  } as MailOptions;
};

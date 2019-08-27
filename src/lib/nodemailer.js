import { resolve } from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import emailConfig from '../config/email';

class Mailer {
  constructor() {
    const { host, port, auth } = emailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  sendMail(mailOptions) {
    return this.transporter.sendMail({
      ...emailConfig.default,
      ...mailOptions,
    });
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        extName: '.hbs',
        viewPath,
      })
    );
  }
}

export default new Mailer();

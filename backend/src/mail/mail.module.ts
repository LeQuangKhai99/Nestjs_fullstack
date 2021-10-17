import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mailhog',
        port: 1025,
        secure: false,
        auth: {
          user: 'test67890099@gmail.com',
          pass: 'khai678900',
        },
      },
      defaults: {
        from: "No Reply test67890099@gmail.com"
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}

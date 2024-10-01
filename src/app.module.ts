import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging.interceptor';
import { Concert } from './entity/Concert/entity/concert';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entity/Ticket/entity/ticket';
import { Order } from './entity/Order/entity/order';
import { User } from './entity/User/entity/user';
import { ConcertModule } from './entity/Concert/ConcertModule';
import { OrderModule } from './entity/Order/OrderModule';
import { TicketModule } from './entity/Ticket/ticketModule';
import { UserModule } from './entity/User/userModule';
import { HttpExceptionFilter } from './http.exception.filter';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-crsj7sl6l47c73d0ohr0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'svi_project_bd_user',
      password: '1x50pXiFSEkVguWW1qECuwlurSN2M0bE',
      database: 'svi_project_bd',
      synchronize: true,
      entities: [Concert, Ticket, Order, User],
      ssl: true,
    }),
    ConcertModule,
    OrderModule,
    TicketModule,
    UserModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure() {}
}

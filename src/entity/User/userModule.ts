import { Module } from '@nestjs/common';
import { UserController } from './Controller/userController';
import { UserService } from './Service/userService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

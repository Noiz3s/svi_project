import {
  Get,
  Post,
  Controller,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  Put,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { UserService } from '../Service/userService';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entity/user';
import { UserDTO } from '../DTO/userDTO';
import { Response } from 'express';
import { registrateUserDTO } from '../DTO/registrateUserDTO';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('All_users')
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: User,
    isArray: true,
  })
  async getAllUsers(): Promise<User[]> {
    return this.service.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return user',
    type: User,
    isArray: false,
  })
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.service.getUserById(id);
  }

  @Get(':email')
  @ApiResponse({
    status: 200,
    description: 'Return user',
    type: User,
    isArray: false,
  })
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.service.getUserByEmail(email);
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'register user',
    type: User,
    isArray: false,
  })
  async registerUser(
    @Body() userData: registrateUserDTO,
    @Res() res: Response,
  ) {
    const existingUser = await this.service.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    await this.service.createUser(userData);
    res.redirect('/login.html');
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'login user',
    type: User,
    isArray: false,
  })
  async loginUser(
    @Body() userData: UserDTO,
    @Res() res: Response,
  ): Promise<User> {
    const user = await this.service.getUserByEmail(userData.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (userData.password !== user.hashPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    res.json({
      success: true,
      user: {
        isadmin: user.isadmin,
      }
    });
    //res.redirect('/cabinet.html');
    return user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: 'update user',
    type: User,
    isArray: false,
  })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UserDTO,
  ): Promise<User> {
    return this.service.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: User,
    isArray: true,
  })
  async deleteUser(@Param('id') id: number) {
    return this.service.deleteUser(id);
  }
}

import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { User } from '../entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../DTO/userDTO';
import { registrateUserDTO } from '../DTO/registrateUserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: registrateUserDTO): Promise<User> {
    if (createUserDto.password !== createUserDto.repeat_password) {
      throw new Error('Passwords do not match');
    }

    const newnewUser = this.userRepository.create({
      email: createUserDto.email,
      hashPassword: createUserDto.password,
    })
    return this.userRepository.save(newnewUser);
  }

  async updateUser(id: number, updateUserDto: UserDTO): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}

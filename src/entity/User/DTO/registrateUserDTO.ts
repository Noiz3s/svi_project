import { IsNotEmpty, IsString } from 'class-validator';

export class registrateUserDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  repeat_password: string;

}

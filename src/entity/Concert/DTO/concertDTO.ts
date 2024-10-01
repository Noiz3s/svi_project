import { IsNotEmpty, IsString } from 'class-validator';

export class ConcertDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  date: Date;
}

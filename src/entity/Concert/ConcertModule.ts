import { Module } from '@nestjs/common';
import { ConcertController } from './Controller/ConcertController';
import { ConcertService } from './Service/ConcertService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entity/concert';
import { MyGateway } from '../../Gateway/MyGateway';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  controllers: [ConcertController],
  providers: [ConcertService, MyGateway],
})
export class ConcertModule {}

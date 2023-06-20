import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class ResturantmanagerService {
    private readonly orderReporsitory: Repository<Order>;

    constructor(@Inject('CONNECTION')private connection:DataSource){
        this.orderReporsitory =     this.connection.getRepository(Order)
    }

   async saveOrder(obj:{amount}):Promise<Order>{
      const resturantOrder=  this.orderReporsitory.save(obj)
      return resturantOrder
    }


}

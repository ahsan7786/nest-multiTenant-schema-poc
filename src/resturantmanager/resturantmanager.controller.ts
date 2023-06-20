import { Controller, Get } from '@nestjs/common';
import { ResturantmanagerService } from './resturantmanager.service';

@Controller('resturantmanager')
export class ResturantmanagerController {

    constructor(private resturantManagerService:ResturantmanagerService){ }

    @Get()
    createOrder(){
        const order={amount:500}
      return  this.resturantManagerService.saveOrder(order)

    }
}

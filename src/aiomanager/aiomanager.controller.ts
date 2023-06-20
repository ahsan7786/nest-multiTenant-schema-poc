import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE, PORT } from 'src/common/aio.constant';
import { AiomanagerService } from './aiomanager.service';


@Controller('aiomanager')
export class AiomanagerController {

    constructor(private aiomanagerService:AiomanagerService){ }


    @Get()
    createResturant(){
        const name={name:'ali'}
       return this.aiomanagerService.createResturant(name)
    }
    @Get('/:id')
    getResturant(@Param("id") id){
        return this.aiomanagerService.getResturant({id:id})
    }

}

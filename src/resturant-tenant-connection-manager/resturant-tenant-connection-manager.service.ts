import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HOST, PORT, USERNAME, PASSWORD, DATABASE } from 'src/common/aio.constant';
import { DataSource } from 'typeorm';

@Injectable()
export class ResturantTenantConnectionManagerService {
   private readonly connectionMap = new Map<string,DataSource>()

   constructor(private configService:ConfigService){}

   hasTenant(resturantName:string){
    return this.connectionMap.has(resturantName)
   }


 async  createResturantConnectionManager(name:string){

    if(!this.hasTenant(name)){
        const resturantDataSource = new DataSource({
            type: 'postgres',
            host: this.configService.get(HOST),
            port: parseInt(this.configService.get(PORT)),
            username: this.configService.get(USERNAME),
            password: this.configService.get(PASSWORD),
            database: this.configService.get(DATABASE),
            name:name,
            schema:name,
            entities: [join(__dirname, '/../resturantmanager/entities/*.entity{.ts,.js}')],
            synchronize: true,
        })
       await resturantDataSource.initialize()
     this.connectionMap.set(name,resturantDataSource)
    return this.connectionMap.get(name)
    }

   }

  async getResturantConnectionManager(name:string){
    if(this.hasTenant(name))
   return this.connectionMap.get(name)
   else{
    await this.createResturantConnectionManager(name)
    return this.connectionMap.get(name)
   }

   }
  


    
}

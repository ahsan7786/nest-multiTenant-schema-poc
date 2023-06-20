import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Resturant } from './entities/resturant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { ResturantTenantConnectionManagerService } from 'src/resturant-tenant-connection-manager/resturant-tenant-connection-manager.service';

@Injectable()
export class AiomanagerService {

    @InjectRepository(Resturant)
    private repo:Repository<Resturant>

    constructor(private tenantConnectionManager:ResturantTenantConnectionManagerService){}



  async createResturant(obj:{name}):Promise<Resturant>{
     const resturant =   this.repo.create(obj)
    const resturantTenant = await this.repo.save(resturant)
    await  this.repo.query(`CREATE SCHEMA IF NOT EXISTS "${resturantTenant.id}-resturant"`)
    let ResturantDataSource ;
    if(this.tenantConnectionManager.hasTenant(resturantTenant.id.toString())){

      ResturantDataSource =   this.tenantConnectionManager.getResturantConnectionManager(`${resturantTenant.id}-resturant`)
    

    }
    else{
         ResturantDataSource =  await this.tenantConnectionManager.createResturantConnectionManager(`${resturantTenant.id}-resturant`)

    }
    const query =`CREATE TABLE IF NOT EXISTS "${resturantTenant.id}-resturant".order(id integer NOT NULL,amount integer,CONSTRAINT order_pkey PRIMARY KEY (id))`;
    await ResturantDataSource.query(query)
    console.log(`Table is created`)
    return resturantTenant
    }

    async getResturant(obj:{id}){
      return this.repo.findOneBy(obj)
    }


}

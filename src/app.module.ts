import { Module } from '@nestjs/common';
import { AiomanagerModule } from './aiomanager/aiomanager.module';
import { ConfigModule } from '@nestjs/config';
import { ResturantmanagerModule } from './resturantmanager/resturantmanager.module';
import { ResturantTenantConnectionManagerModule } from './resturant-tenant-connection-manager/resturant-tenant-connection-manager.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AiomanagerModule,  ResturantTenantConnectionManagerModule,ResturantmanagerModule]
})
export class AppModule {}

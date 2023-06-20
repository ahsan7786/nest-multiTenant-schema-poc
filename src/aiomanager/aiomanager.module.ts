import { Module } from '@nestjs/common';
import { AiomanagerController } from './aiomanager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { DATABASE, HOST, PASSWORD, PORT, SCHEMA, USERNAME } from 'src/common/aio.constant';
import { AiomanagerService } from './aiomanager.service';
import { join } from 'path';
import { Resturant } from './entities/resturant.entity';
import { ResturantTenantConnectionManagerModule } from 'src/resturant-tenant-connection-manager/resturant-tenant-connection-manager.module';
import { ResturantTenantConnectionManagerService } from 'src/resturant-tenant-connection-manager/resturant-tenant-connection-manager.service';
@Module({
  imports:[TypeOrmModule.forRootAsync({
    imports: [ConfigModule],      
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get(HOST),
      port: parseInt(configService.get(PORT)),
      username: configService.get(USERNAME),
      password: configService.get(PASSWORD),
      database: configService.get(DATABASE),
      schema:configService.get(SCHEMA),
      entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    inject: [ConfigService],
  }),TypeOrmModule.forFeature([Resturant]),ResturantTenantConnectionManagerModule],
  controllers: [AiomanagerController],
  providers: [AiomanagerService,ResturantTenantConnectionManagerService]
})
export class AiomanagerModule {}

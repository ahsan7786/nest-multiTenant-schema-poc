import { Module } from '@nestjs/common';
import { ResturantTenantConnectionManagerService } from './resturant-tenant-connection-manager.service';

@Module({
  providers: [ResturantTenantConnectionManagerService],
  exports:[ResturantTenantConnectionManagerService]
})
export class ResturantTenantConnectionManagerModule {}

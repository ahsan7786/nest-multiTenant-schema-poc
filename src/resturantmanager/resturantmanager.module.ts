import { Module, Scope } from '@nestjs/common';
import { REQUEST  } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';

import { ResturantTenantConnectionManagerService } from 'src/resturant-tenant-connection-manager/resturant-tenant-connection-manager.service';
import { ResturantmanagerController } from './resturantmanager.controller';
import { ResturantmanagerService } from './resturantmanager.service';

const connectionFactory = {
    provide: "CONNECTION",
    scope: Scope.REQUEST,
    useFactory: (request: any,resturantDataSource:ResturantTenantConnectionManagerService) => {
      const { tenantId } = request;
  
      if (tenantId) {
        return resturantDataSource.getResturantConnectionManager(`${tenantId}-resturant`)
      }
  
      return null;
    },
    inject: [REQUEST,ResturantTenantConnectionManagerService],
  };


@Module({
    imports:[ResturantmanagerModule],
    providers:[connectionFactory,ResturantTenantConnectionManagerService, ResturantmanagerService],
    controllers: [ResturantmanagerController]
})
export class ResturantmanagerModule {}

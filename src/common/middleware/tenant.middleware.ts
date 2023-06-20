import { NextFunction, Request, Response } from 'express';

const TENANT_HEADER = 'x-tenant-id'

export function ResturantTenancyMiddleware(req: any, _res: Response, next: NextFunction): void {
  const header = req.headers[TENANT_HEADER] as string;
  req.tenantId = header?.toString() || null;
  next();
}

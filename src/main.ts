import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResturantTenancyMiddleware } from './common/middleware/tenant.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(ResturantTenancyMiddleware)
  await app.listen(3000);
}
bootstrap();

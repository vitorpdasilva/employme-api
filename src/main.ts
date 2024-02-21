import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EmployMeModule } from './employme/employme.module';

async function bootstrap() {
  const app = await NestFactory.create(EmployMeModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('PORT');
  Logger.log(`http://localhost:${PORT}`);
  const config = new DocumentBuilder()
    .setTitle('Employ Me Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, { swaggerUrl: '/json' });
  app.enableCors();
  app.setGlobalPrefix('/api');
  await app.listen(PORT);
}

bootstrap();

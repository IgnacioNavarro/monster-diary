import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './modules/exception-filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, 
    exceptionFactory: (errors) => new BadRequestException(errors)}));
  const configSwagger = new DocumentBuilder()
    .setTitle('Monster Diary')
    .setDescription('The Monster Diary API description')
    .setVersion('1.0')
    .addTag('default')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

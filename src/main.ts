// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import dotenv from "dotenv-flow"
// dotenv.config()
import { AppModule } from './app.module';


async function bootstrap() {
  // const instance = express()
  // instance.all("*", Middleware)
  // const app = await NestFactory.create(AppModule, instance);
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({transform: true}))        // this is used to use the global validation for DTOs
  await app.listen(5000);
}
bootstrap();

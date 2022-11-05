import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { logger } from './logger.fn.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // use global middleware
  // app.use(logger)

  app.enableCors({ origin: 'localhost' })
  await app.listen(3000)
}
bootstrap()

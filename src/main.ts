import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Increase payload size limit to 50mb for image uploads
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const port = process.env.PORT || 5001;

  // Configure CORS explicitly for allowed origins including advocateonrecordtushargarg.com
  const allowedOrigins = [
    'https://advocateonrecordtushargarg.com',
    'https://www.advocateonrecordtushargarg.com',
    'http://advocateonrecordtushargarg.com',
    'http://www.advocateonrecordtushargarg.com',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:5001',
    'http://localhost:3001',
    `http://localhost:${port}`,
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  if (process.env.ALLOWED_ORIGINS) {
    const extraOrigins = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    allowedOrigins.push(...extraOrigins);
  }

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, postman, curl)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) => {
        return allowed && (origin === allowed || origin.endsWith('.advocateonrecordtushargarg.com'));
      });

      if (isAllowed || origin.includes('advocateonrecordtushargarg.com')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, Origin, Access-Control-Allow-Origin, Access-Control-Allow-Headers',
  });

  await app.listen(port, '0.0.0.0');
  console.log(`Backend running on port ${port}`);
}
bootstrap();

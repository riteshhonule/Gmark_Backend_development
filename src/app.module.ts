// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '1234',
//       database: 'nest_users_db',
//       autoLoadEntities: true,
//       synchronize: true, 
//     }),
//     UsersModule,
//   ],
// })
// export class AppModule {}


// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth';
// import * as fs from 'fs';

// @Module({
//   imports: [
//     //  Load env & JSON config (GLOBAL)
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV}`,
//       load: [
//         () =>
//           JSON.parse(
//             fs.readFileSync('config/auth.config.json', 'utf8'),
//           ),
//       ],
//     }),

//     //  Database config using env variables
//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: Number(configService.get('DB_PORT')),
//         username: configService.get('DB_USER'),
//         password: String(configService.get('DB_PASS')), 
//         database: configService.get('DB_NAME'),
//         autoLoadEntities: true,
//         synchronize: true,
//       }),
//     }),

 
//     // 3 Feature Modules
//     UsersModule,
//     AuthModule,
//   ],
// })
// export class AppModule { }

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

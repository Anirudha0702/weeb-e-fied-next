import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/orm.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { OtpModule } from './otp/otp.module';
import { JwtService } from './auth/jwt/jwt.service';
import { EmailService } from './email/email.service';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/stratagy/google.strategy';
import { FacebookStrategy } from './auth/stratagy/facebook.strategy';
import { UploadService } from './upload/upload.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // optional, since ConfigModule is global
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return getTypeOrmConfig(configService);
      },
    }),
    UsersModule,
    OtpModule,
    PassportModule.register({ session: false }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    EmailService,
    JwtService,
    GoogleStrategy,
    FacebookStrategy,
    UploadService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

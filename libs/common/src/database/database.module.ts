import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from '../config';

@Module({
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
        }),
        inject: [ConfigService]
    })]
})
export class DatabaseModule {}

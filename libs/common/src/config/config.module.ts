import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule as NestConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigService] // I am not sure if this is a great way to go about. please share insights if i need to globalize the config module, is is best to export the configService provider. willing to learn
})
export class ConfigModule {}

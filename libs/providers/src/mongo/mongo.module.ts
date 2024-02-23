import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DATABASE_CONNECTION")
      }),
      inject: [ ConfigService ]
    })
  ]
})
export class MongoModule {
}

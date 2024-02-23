import { Module } from "@nestjs/common";
import { MongoModule } from "./mongo/mongo.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongoModule
  ]
})
export class ProvidersModule {
}

import { Module } from "@nestjs/common";
import { ProvidersModule } from "@lib/providers";
import { DomainModule } from "@lib/domain";
import { ProductController } from "./controllers/product.controller";
import { FMediatorModule } from "@foblex/nestjs-mediator";

@Module({
  imports: [
    FMediatorModule.forRoot(),
    ProvidersModule,
    DomainModule
  ],
  controllers: [ProductController],
})
export class AppModule {
}

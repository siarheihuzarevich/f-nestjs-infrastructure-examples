import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "@lib/domain/product/product.schema";
import { CreateProductHandler } from "@lib/domain/product/create/create-product.handler";
import { CreateProductValidator } from "@lib/domain/product/create/create-product.validator";
import { GetProductListHandler } from "@lib/domain/product/get-list/get-product-list.handler";
import { GetProductHandler } from "@lib/domain/product/get/get-product.handler";
import { DeleteProductValidator } from "@lib/domain/product/delete/delete-product.validator";
import { DeleteProductHandler } from "@lib/domain/product/delete/delete-product.handler";
import { UpdateProductHandler } from "@lib/domain/product/edit/update-product.handler";
import { UpdateProductValidator } from "@lib/domain/product/edit/update-product.validator";

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Product.name, schema: ProductSchema } ])
  ],
  providers: [
    CreateProductValidator, CreateProductHandler,
    GetProductHandler,
    GetProductListHandler,
    UpdateProductValidator, UpdateProductHandler,
    DeleteProductValidator, DeleteProductHandler
  ]
})
export class DomainModule {
}

import { CreateProductRequest } from "@lib/domain/product/create/create-product-request";
import { CommandExecutable, Executable } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";

@Executable(CreateProductRequest)
export class CreateProductHandler
  extends CommandExecutable<CreateProductRequest, void> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
    super();
  }

  public async executeAsync(payload: CreateProductRequest): Promise<void> {

    const context = new this.dataContext(payload);
    await context.save();

  }
}

import { CommandExecutable, Executable } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { GetProductRequest } from "@lib/domain/product/get/get-product-request";
import { DeleteProductRequest } from "@lib/domain/product/delete/delete-product-request";

@Executable(DeleteProductRequest)
export class DeleteProductHandler
  extends CommandExecutable<GetProductRequest, void> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
    super();
  }

  public async executeAsync(payload: GetProductRequest): Promise<void> {
    await this.dataContext.findByIdAndDelete(payload.id).exec();
  }
}

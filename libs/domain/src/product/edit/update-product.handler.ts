import { Executable, QueryExecutable } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { UpdateProductRequest } from "@lib/domain/product/edit/update-product-request";

@Executable(UpdateProductRequest)
export class UpdateProductHandler
  extends QueryExecutable<UpdateProductRequest, void> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
    super();
  }

  public async executeAsync(payload: UpdateProductRequest): Promise<void> {

    await this.dataContext.findByIdAndUpdate(payload.id, {
      name: payload.name,
      description: payload.description,
      price: payload.price
    }).exec();
  }
}

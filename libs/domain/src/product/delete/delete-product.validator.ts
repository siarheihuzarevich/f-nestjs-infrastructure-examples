import { Validator } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { IRequestValidator } from "@foblex/nestjs-mediator/mediator/i-request-validator";
import { HttpException } from "@nestjs/common";
import { DeleteProductRequest } from "@lib/domain/product/delete/delete-product-request";

@Validator(DeleteProductRequest)
export class DeleteProductValidator
  implements IRequestValidator<DeleteProductRequest, void> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
  }

  public async handle(payload: DeleteProductRequest): Promise<void> {
    const product = await this.dataContext.findById(payload.id);

    if (!product) {
      throw new HttpException('Resource not found', 404);
    }
  }
}

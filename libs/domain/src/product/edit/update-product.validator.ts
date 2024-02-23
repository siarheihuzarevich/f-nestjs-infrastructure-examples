import { Validator } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { IRequestValidator } from "@foblex/nestjs-mediator/mediator/i-request-validator";
import { HttpException } from "@nestjs/common";
import { UpdateProductRequest } from "@lib/domain/product/edit/update-product-request";

@Validator(UpdateProductRequest)
export class UpdateProductValidator
  implements IRequestValidator<UpdateProductRequest, void> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
  }

  public async handle(payload: UpdateProductRequest): Promise<void> {
    const errors: string[] = [];

    if (!payload.name) {
      errors.push("Name is required");
    }

    if (!payload.price) {
      errors.push("Price is required");
    }

    const product = await this.dataContext.findById(payload.id).exec();
    if(!product) {
      errors.push('Resource not found');
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, 400);
    }
  }
}

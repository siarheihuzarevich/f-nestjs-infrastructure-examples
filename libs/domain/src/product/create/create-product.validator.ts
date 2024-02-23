import { CreateProductRequest } from "@lib/domain/product/create/create-product-request";
import { Validator } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { IRequestValidator } from "@foblex/nestjs-mediator/mediator/i-request-validator";
import { HttpException } from "@nestjs/common";

@Validator(CreateProductRequest)
export class CreateProductValidator
  implements IRequestValidator<CreateProductRequest, void> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
  }

  public async handle(payload: CreateProductRequest): Promise<void> {
    const errors: string[] = [];

    if (!payload.name) {
      errors.push("Name is required");
    }

    if (!payload.price) {
      errors.push("Price is required");
    }

    const product = await this.dataContext.findOne({ name: payload.name });
    if (product) {
      errors.push("Product already exists");
    }

    if (errors.length > 0) {
      throw new HttpException({ errors }, 400);
    }
  }
}

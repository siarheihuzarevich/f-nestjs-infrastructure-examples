import { Executable, QueryExecutable } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { GetProductResponse } from "@lib/domain/product/get/get-product-response";
import { GetProductRequest } from "@lib/domain/product/get/get-product-request";
import { HttpException } from "@nestjs/common";
import { IProductResponseModel } from "@lib/domain/product/i-product-response-model";

@Executable(GetProductRequest)
export class GetProductHandler
  extends QueryExecutable<GetProductRequest, GetProductResponse> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
    super();
  }

  public async executeAsync(payload: GetProductRequest): Promise<GetProductResponse> {
    const product = await this.dataContext.findById<IProductResponseModel>(payload.id).exec();
    if(!product) {
      throw new HttpException('Resource not found', 404);
    }

    return new GetProductResponse(product);
  }
}

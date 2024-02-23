import { CreateProductRequest } from "@lib/domain/product/create/create-product-request";
import { Executable, QueryExecutable } from "@foblex/nestjs-mediator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "@lib/domain/product/product.schema";
import { GetProductListResponse } from "@lib/domain/product/get-list/get-product-list-response";
import { GetProductListRequest } from "@lib/domain/product/get-list/get-product-list-request";
import { IProductResponseModel } from "@lib/domain/product/i-product-response-model";

@Executable(GetProductListRequest)
export class GetProductListHandler
  extends QueryExecutable<CreateProductRequest, GetProductListResponse> {

  constructor(
    @InjectModel(Product.name) private dataContext: Model<Product>
  ) {
    super();
  }

  public async executeAsync(payload: CreateProductRequest): Promise<GetProductListResponse> {
    const products = await this.dataContext.find<IProductResponseModel>().exec();
    return new GetProductListResponse(products);
  }
}

import { IProductResponseModel } from "@lib/domain/product/i-product-response-model";
import { IResponseBase } from "@lib/domain/i-response-base";

export class GetProductResponse
  implements IResponseBase<IProductResponseModel> {

  constructor(
    public data: IProductResponseModel
  ) {
  }
}

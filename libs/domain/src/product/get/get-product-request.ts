import { IRequest } from "@foblex/nestjs-mediator";
import { GetProductResponse } from "@lib/domain/product/get/get-product-response";

export class GetProductRequest implements IRequest<GetProductResponse> {

  constructor(
    public id: string
  ) {
  }
}

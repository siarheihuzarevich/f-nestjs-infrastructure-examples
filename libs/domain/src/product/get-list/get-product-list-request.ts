import { IRequest } from "@foblex/nestjs-mediator";
import { GetProductListResponse } from "@lib/domain/product/get-list/get-product-list-response";

export class GetProductListRequest
  implements IRequest<GetProductListResponse> {

}

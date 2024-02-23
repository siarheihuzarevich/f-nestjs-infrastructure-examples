import { IRequest } from "@foblex/nestjs-mediator";

export class DeleteProductRequest implements IRequest<void> {

  constructor(
    public id: string
  ) {
  }
}

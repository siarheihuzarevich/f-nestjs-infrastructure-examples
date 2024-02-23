import { IRequest } from "@foblex/nestjs-mediator";

export class CreateProductRequest implements IRequest<void> {

  constructor(
    public name: string,
    public description: string,
    public price: number,
  ) {
  }
}

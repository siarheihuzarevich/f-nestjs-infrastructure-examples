import { IRequest } from "@foblex/nestjs-mediator";

export class UpdateProductRequest implements IRequest<void> {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
  ) {
  }
}

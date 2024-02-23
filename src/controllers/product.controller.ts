import { Controller, Body, Post, Get, Param, Delete, Put } from "@nestjs/common";
import { CreateProductRequest } from "@lib/domain/product/create/create-product-request";
import { FMediator } from "@foblex/nestjs-mediator";
import { GetProductListRequest } from "@lib/domain/product/get-list/get-product-list-request";
import { GetProductRequest } from "@lib/domain/product/get/get-product-request";
import { DeleteProductRequest } from "@lib/domain/product/delete/delete-product-request";
import { GetProductResponse } from "@lib/domain/product/get/get-product-response";
import { GetProductListResponse } from "@lib/domain/product/get-list/get-product-list-response";
import { UpdateProductRequest } from "@lib/domain/product/edit/update-product-request";

/**
 * Controller to manage products.
 */
@Controller("products")
export class ProductController {

  /**
   * Constructs the product controller.
   * @param {FMediator} mediator The mediator for CQRS pattern implementation.
   */
  constructor(
      private mediator: FMediator
  ) {
  }

  /**
   * Creates a new product.
   * @param {CreateProductRequest} payload The product creation request payload.
   * @returns A promise resolved with no value upon successful creation.
   */
  @Post()
  public async create(@Body() payload: CreateProductRequest) {
    return this.mediator.send<CreateProductRequest, void>(CreateProductRequest, payload);
  }

  /**
   * Lists products based on criteria.
   * @param {GetProductListRequest} payload The criteria for listing products.
   * @returns A promise resolved with a list of products.
   */
  @Get()
  public async list(@Body() payload: GetProductListRequest) {
    return this.mediator.send<GetProductListRequest, GetProductListResponse>(GetProductListRequest, payload);
  }

  /**
   * Gets the details of a specific product.
   * @param {string} id The unique identifier of the product.
   * @returns A promise resolved with the product details.
   */
  @Get(":id")
  public async details(@Param("id") id: string) {
    return this.mediator.send<GetProductRequest, GetProductResponse>(GetProductRequest, new GetProductRequest(id));
  }

  /**
   * Edits an existing product.
   * @param {string} id The unique identifier of the product to edit.
   * @param {UpdateProductRequest} payload The updated product data.
   * @returns A promise resolved with no value upon successful update.
   */
  @Put(":id")
  public async edit(@Param("id") id: string, @Body() payload: UpdateProductRequest) {
    payload.id = id;
    return this.mediator.send<UpdateProductRequest, void>(UpdateProductRequest, payload);
  }

  /**
   * Deletes a product.
   * @param {string} id The unique identifier of the product to delete.
   * @returns A promise resolved with no value upon successful deletion.
   */
  @Delete(":id")
  public async delete(@Param("id") id: string) {
    return this.mediator.send<DeleteProductRequest, void>(DeleteProductRequest, new DeleteProductRequest(id));
  }
}

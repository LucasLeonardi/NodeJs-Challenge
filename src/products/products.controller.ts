import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Cron } from '@nestjs/schedule';
import { ErrorHandling } from 'src/config/error-handling';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Conversion Currency')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Cron('00 07 * * *')
  importProducts() {
    this.productsService.importProducts();
  }

  @ApiOperation({ summary: 'Forces Import of products' })
  @Post()
  forceImportProducts() {
    return this.productsService.importProducts();
  }

  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiQuery({ name : "take", type: "number", required: true })
  @ApiQuery({ name : "skip", type: "number", required: true })
  @Get()
  getAll(
    @Query('take') take: number,
    @Query('skip') skip: number
  ) {
    try{
      return this.productsService.findAll(take, skip);
    }catch(error){
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'Get one product by code' })
  @Get(':code')
  async getOne(@Param('code') code: string) {
    try{
      return this.productsService.findOne(code);
    }catch(error){
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'Update a product by code' })
  @ApiBody({ type: UpdateProductDto })
  @Put(':code')
  async update(@Param('code') code: string, @Body() updateProductDto: UpdateProductDto) {
    try{
      return await this.productsService.updateProduct(code, updateProductDto);
    }catch(error){
      new ErrorHandling(error);
    }
  }

  @ApiOperation({ summary: 'Change a product status to "TRASH"' })
  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.productsService.remove(code);
  }
}

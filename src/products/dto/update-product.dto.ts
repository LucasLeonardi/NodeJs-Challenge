import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {

  @ApiProperty()
  url?: string;

  @ApiProperty()
  creator?: string;

  @ApiProperty()
  productName?: string;
  
  @ApiProperty()
  quantity?: string;

  @ApiProperty()
  brands?: string;

  @ApiProperty()
  categories?: string;

  @ApiProperty()
  labels?: string;

  @ApiProperty()
  cities?: string;

  @ApiProperty()
  purchasePlaces?: string;

  @ApiProperty()
  stores?: string;

  @ApiProperty()
  ingredientsText?: string;

  @ApiProperty()
  traces?: string;

  @ApiProperty()
  servingSize?: string;
  
  @ApiProperty()
  servingQuantity?: string;

  @ApiProperty()
  nutriscoreScore?: string;

  @ApiProperty()
  nutriscoreGrade?: string;
  
  @ApiProperty()
  mainCategory?: string;

  @ApiProperty()
  imageUrl?: string;
}

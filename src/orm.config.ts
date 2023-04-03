import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Product } from "./products/entities/product.entity";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  username: "postgres",
  password: "12345",
  port: 5432,
  host: "postgres",
  database: "productsDB",
  synchronize: true,
  entities: [
    Product
  ]
}
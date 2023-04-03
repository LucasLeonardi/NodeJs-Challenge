import { BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
  Draft = "DRAFT", 
  Trash = "TRASH",
  Published = "PUBLISHED"
}

@Entity('products')
export class Product extends BaseEntity{
  @Column()
  @Generated("uuid")
  id:string;

  @PrimaryColumn()
  code: string

  @Column({ type: "enum", enum: Status, nullable:true, default: Status.Published })
  status: Status;

  @UpdateDateColumn({ name: 'imported_t' })
  importedT: Date;

  @Column({ type: "varchar", nullable:true })
  url: string;

  @Column({ type: "varchar", nullable:true })
  creator: string;

  @Column({type: "varchar", name: "created_t" })
  createdT: string; 

  @Column({ name: "last_modified_t", type: "varchar",  nullable:true})
  lastModifiedT: string;

  @Column({ name: "product_name" ,type: "varchar", nullable:true })
  productName: string;
  
  @Column({ type: "varchar", nullable:true })
  quantity: string;

  @Column({ type: "varchar", nullable:true })
  brands: string;

  @Column({ type: "varchar", nullable:true })
  categories: string;

  @Column({ type: "varchar", nullable:true })
  labels: string;

  @Column({ type: "varchar", nullable:true })
  cities: string;

  @Column({ name: "purchase_places" ,type: "varchar", nullable:true })
  purchasePlaces: string;

  @Column({ type: "varchar", nullable:true })
  stores: string;

  @Column({ name:"ingredients_text", type: "varchar", nullable:true })
  ingredientsText: string;

  @Column({ type: "varchar", nullable:true })
  traces: string;

  @Column({ name: "serving_size", type: "varchar", nullable:true })
  servingSize: string;
  
  @Column({ name: "serving_quantity", type: "varchar", nullable:true })
  servingQuantity: string;

  @Column({ name: "nutriscore_score", type: "varchar", nullable:true })
  nutriscoreScore: string;

  @Column({ name: "nutriscore_grade", type: "varchar", nullable:true })
  nutriscoreGrade: string;
  
  @Column({ name: "main_category", type: "varchar", nullable:true })
  mainCategory: string;

  @Column({ name: "image_url", type: "varchar", nullable:true })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

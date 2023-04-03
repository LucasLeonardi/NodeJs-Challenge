import { HttpException, Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { writeFile } from 'fs/promises'
import { ungzip } from 'node-gzip';
import { ProductRepository } from './products.repository';
import camelcaseKeys from 'camelcase-keys';
import { Status } from './entities/product.entity';
const fetch = require("node-fetch");
const fs = require('fs');
const readline = require('readline');


@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductRepository
  ){}

  async importProducts() {
    for (let i = 1; i <= 9; i++) {
      let fileName = process.env.FILE_NAME.replace("{}", i.toString())
      const siteURL = process.env.SITE_URL.replace("{}", fileName)
      await this.downloadFile(siteURL, process.env.DECOMPRESSED_FILE.replace("{}", i.toString()))
      await this.parseJsonAndSave(process.env.DECOMPRESSED_FILE.replace("{}", i.toString()))
    }
  }

  async findAll(take: number, skip: number) {
    let products = await this.productsRepository.findAndCount({
      order: {createdAt: "DESC"},
      take: take,
      skip: skip   
    })

    if(!products || !products.length){
      throw new HttpException("PRODUCTS_NOT_FOUND", 404);
    }

    return products;
  }

  async findOne(code: string) {
    let product = await this.productsRepository.findOne({ where : {code:code}})
    if(!product){
      throw new HttpException("PRODUCT_NOT_FOUND", 404);
    }
    return product;
  }

  async updateProduct(code: string, updateProductDto: UpdateProductDto) {
    let product = await this.productsRepository.findOne({ where : {code:code}})
    if(!product){
      throw new HttpException("PRODUCT_NOT_FOUND", 404);
    }
    return await this.productsRepository.save({
      ...product,
      ...updateProductDto
    })
  }

  async remove(code: string) {
    let product = await this.productsRepository.findOne({ where : {code:code}})
    if(!product){
      throw new HttpException("PRODUCT_NOT_FOUND", 404);
    }
    await this.productsRepository.update({
      code: code,
    },{
      status: Status.Trash
    })
    return await this.productsRepository.findOne({ where : {code:code}})
  }

  async downloadFile(url: string, fileName: string) {
    let compressedFile = await fetch(url);
    const decompressed = (await ungzip(await compressedFile.arrayBuffer()));
    await writeFile(process.env.DOWNLOAD_DIR.replace("{}", fileName), decompressed, { encoding: 'utf-8'})
  }

  async parseJsonAndSave(fileName: string){
    let count = 0
    let products = []
    const readStream = fs.createReadStream(process.env.DOWNLOAD_DIR.replace("{}", fileName));
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if(count == 100){
        await this.productsRepository.save(products)
        fs.unlinkSync(process.env.DOWNLOAD_DIR.replace("{}", fileName));
        break;
      }
      count++
      products.push(camelcaseKeys(JSON.parse(line)))
    }
  }

}

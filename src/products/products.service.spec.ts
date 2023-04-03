import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let productService: ProductsService;
  let productRepository: ProductRepository;

  const productExemple = {
    id: "b7deb28d-cd52-44c8-a788-0d5b26a78cf5",
    code: "8718215831976",
    status: "TRASH",
    importedT: "2023-04-03T00:21:13.415Z",
    url: "http://world-en.openfoodfacts.org/product/8718215831976/crackers",
    creator: "kiliweb",
    createdT: "1553864762",
    lastModifiedT: "1553864766",
    productName: "Crackers",
    quantity:"" ,
    brands:"" ,
    categories: "",
    labels:"" ,
    cities: "",
    purchasePlaces:"",
    stores:"" ,
    ingredientsText:"" ,
    traces:"" ,
    servingSize:"" ,
    servingQuantity:"" ,
    nutriscoreScore:"" ,
    nutriscoreGrade:"" ,
    mainCategory:"" ,
    imageUrl: "https://static.openfoodfacts.org/images/products/871/821/583/1976/front_fr.4.400.jpg",
    createdAt: "2023-04-03T00:21:13.415Z"
  }

  const totalProductsInDB = 900
  const mockProductsRepository = {
    findAndCount: jest.fn().mockImplementation(dto => Promise.resolve([
      [
        productExemple,
        productExemple,
      ],
      totalProductsInDB
    ])),
    findOne: jest.fn().mockImplementation(code => Promise.resolve(productExemple)),
    save: jest.fn().mockImplementation(code => Promise.resolve(productExemple)),
    update: jest.fn().mockImplementation(code => Promise.resolve(productExemple)),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductRepository),
          useValue: mockProductsRepository
        },
      ],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<ProductRepository>(ProductRepository)
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('findAll', ()=> {
    it('should get all products with pagination', async () => {
      const result = await productService.findAll(2, 0);
      expect(result[0].length).toEqual(2);
      expect(result[1]).toEqual(totalProductsInDB)
    });
  });

  describe('findOne', ()=> {
    it('should get one product by code', async () => {
      const result = await productService.findOne("8718215831976");
      expect(result.code).toEqual("8718215831976");
      expect(result).toEqual(productExemple)
    });
  });

  describe('updateProduct', ()=> {
    it('should update one product by code', async () => {
      const result = await productService.updateProduct("8718215831976", { creator: "kiliweb", productName: "Crackers" });
      expect(result.code).toEqual("8718215831976");
      expect(result.creator).toEqual("kiliweb")
      expect(result.productName).toEqual("Crackers")
    });
  });

  describe('remove', ()=> {
    it('should update one product by code', async () => {
      const result = await productService.remove("8718215831976");
      expect(result.code).toEqual("8718215831976");
      expect(result.status).toEqual("TRASH")
    });
  });



});

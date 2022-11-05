import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateStockDto } from './dto/create-stock-dto'
import { ProductRepository } from './product.repository'
import * as fsExtra from 'fs-extra'

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(ProductRepository)
    private productsRepository: ProductRepository,
  ) {}

  createProduct(createStockDto: CreateStockDto) {
    return this.productsRepository.createProduct(createStockDto)
  }

  async getProducts(keyword: string) {
    if (keyword) {
      const query = this.productsRepository.createQueryBuilder('product')
      query.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` })
      return query.getMany()
    } else {
      return await this.productsRepository.find()
    }
  }

  async getProductById(id: number) {
    const found = await this.productsRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`Product ${id} is not found!`)
    }
    return found
  }

  async updateProduct(id: number, createStockDto: CreateStockDto) {
    const product = await this.getProductById(id)
    const { name, price, stock } = createStockDto
    product.name = name
    product.stock = stock
    product.price = price
    await product.save()
    return product
  }

  async deleteProduct(id: number) {
    const found = await this.getProductById(id)
    const { image } = found
    await fsExtra.remove(`upload/images${image}`)
    return await this.productsRepository.delete(id)
  }
}

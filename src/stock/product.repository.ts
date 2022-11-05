import { CreateStockDto } from './dto/create-stock-dto'
import { Product } from './product.entity'
import { Repository, EntityRepository } from 'typeorm'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createStockDto: CreateStockDto): Promise<Product> {
    const { name, price, stock } = createStockDto
    const product = new Product()
    product.name = name
    product.price = price
    product.stock = stock
    await product.save()
    return product
  }
}

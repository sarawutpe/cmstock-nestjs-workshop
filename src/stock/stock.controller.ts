import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fsExtra from 'fs-extra'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { LoggerInterceptor } from 'src/logger.interceptor'
import { ChangeStringCasePipe } from 'src/pipes/change-string-case.pipe'
import { CreateStockDto } from './dto/create-stock-dto'
import { StockService } from './stock.service'

@Controller('stock')
@UseInterceptors(LoggerInterceptor)
export class StockController {
  constructor(private stockService: StockService) {}

  // Get Stock With JWT Guards
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getStocks(@Query('keyword') keyword: string) {
    return this.stockService.getProducts(keyword)
  }

  @Get('/:id')
  getStockById(@Param('id') id: number) {
    return this.stockService.getProductById(id)
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  @UsePipes(ValidationPipe)
  @UsePipes(new ChangeStringCasePipe())
  async addStock(@UploadedFile() file, @Body() createStockDto: CreateStockDto) {
    const product = await this.stockService.createProduct(createStockDto)
    const imageFile = product.id + extname(file.filename)
    fsExtra.move(file.path, `upload/images${imageFile}`)
    product.image = imageFile
    await product.save()
    return product
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  async updateStockById(@UploadedFile() file, @Param('id') id: number, @Body() createStockDto: CreateStockDto) {
    const product = await this.stockService.updateProduct(id, createStockDto)

    if (file) {
      fsExtra.remove(`upload/images${product.image}`)
      const imageFile = id + extname(file.filename)
      fsExtra.move(file.path, `upload/images${imageFile}`)
      product.image = imageFile
      await product.save()
    }

    return product
  }

  @Delete('/:id')
  deleteStockById(@Param('id') id: number) {
    return this.stockService.deleteProduct(id)
  }
}

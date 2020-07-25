import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductService) { }
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('desciption') prodDesc: string,
        @Body('price') prodPrice: number,

    ): { id: string } {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId }
    }

    @Get()
    getAllProducts(): Product[] {
        return this.productsService.getProducts();
    }

    @Get('/:id')
    getProducts(
        @Param('id') prodId: string
    ): Product {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Body('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desciption') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }
}
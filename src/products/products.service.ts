import { Product } from "./products.model";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ProductService {
    products: Product[] = [];


    insertProduct(title: string, desc: string, price: number): any {
        const prodId = Math.floor(Math.random() * 1000).toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return this.products;
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    getSingleProduct(productId: string): Product {
        const product = this.findProduct(productId)[0];
        return product;
    }


    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): void {
        const [product, index] = this.findProduct(prodId);
        const updatedProdcut = { ...product }
        if (!prodTitle) {
            updatedProdcut.title = prodTitle;
        }
        if (!prodDesc) {
            updatedProdcut.description = prodDesc;
        }
        if (!prodPrice) {
            updatedProdcut.price = prodPrice;
        }

        this.products[index] = updatedProdcut;

    }

    private findProduct(productId: string): [Product, number] {

        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex]
        console.warn(productIndex, productId);
        if (!product) {
            throw new NotFoundException('could not find product')
        }
        return [product, productIndex];
    }
}
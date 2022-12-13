import { Component, OnInit } from '@angular/core';
import {CartService, ProductsService} from "../../../core/services";
import {Product} from "../../../core/interfaces/product";
import {ActivatedRoute} from "@angular/router";
import {Cart} from "../../../core/interfaces/cart";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product
  productId!:string
  quantity = 1;
  errorQuantity?: string

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params)
      this.productId = params['id']
      this.getProduct()
    })
  }

  getProduct() {
    this.productService.getById(this.productId)
      .subscribe((product) => {
        this.product = product
      })
  }

  addToCart() {
    if(!this.product) return

    if (this.quantity <= 0) {
      this.errorQuantity = 'Quantity must be greater than 0'
      return
    }
    console.log(this.quantity)
    this.cartService.addCart({
      product: this.product,
      quantity: this.quantity
    })
  }
}

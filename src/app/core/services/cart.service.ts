import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {StorageService} from "./storage.service";
import {Cart} from "../interfaces/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carts: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  carts$ = this.carts.asObservable()
  constructor(
    public storageService: StorageService
  ) { }

  initCart() {
    this.carts.next(this.getCart())
  }

  getCart() {
    const cart = this.storageService.get('cart')
    return cart ? JSON.parse(cart) : []
  }

  get totalPrice() {
    const carts = this.getCart()
    return carts.reduce((total: number, item: any) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  addCart(cart: Cart) {
    console.log(cart)
    const carts = this.getCart()
    let quantity = cart.quantity || 1
    const findProduct = carts.find((item: any) => item.product.id === cart.product.id)
    if (findProduct) {
      carts.forEach((item: any) => {
        if (item.product.id === cart.product.id) {
          item.quantity = findProduct.quantity + quantity
        }
      })
    } else {
      carts.push(cart)
    }
    this.storageService.set('cart', JSON.stringify(carts))
    this.carts.next(carts)
  }

  removeCart() {
    this.carts.next(null)
    this.storageService.remove('cart')
    this.initCart()
  }

  removeFromCart(cart: Cart) {
    const carts = this.getCart()
    const index = carts.findIndex((item: any) => item.product.id === cart.product.id)
    carts.splice(index, 1)
    this.storageService.set('cart', JSON.stringify(carts))
    this.carts.next(carts)
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carts: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  carts$ = this.carts.asObservable()
  constructor(
    public storageService: StorageService
  ) { }

  getCart() {
    const cart = this.storageService.get('cart')
    return cart ? JSON.parse(cart) : []
  }

  addCart(product: any) {
    const cart = this.getCart()
    const carts = [...cart, {...product, quantity: 1}]
    this.storageService.set('cart', JSON.stringify(carts))
    this.carts.next(carts)
  }

  removeCart() {
    this.carts.next(null)
  }
}

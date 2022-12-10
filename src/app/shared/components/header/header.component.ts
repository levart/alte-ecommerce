import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services";
import {CartService} from "../../../core/services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount = 0

  constructor(
    public authService: AuthService,
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getCartCount()
  }

  getCartCount() {
    this.cartService.carts$.subscribe(cart => {
      if (cart) {
        this.cartCount = cart.length
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}

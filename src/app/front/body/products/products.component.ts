import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../share/data.service'
import axios from 'axios';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/share/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  cart:any;
  products;
  imgPath: string = environment.image_path;

  constructor(
    private dataService:DataService,
    private productService:ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.dataService.currentCart.subscribe(editCart => (this.cart= editCart)); //<= Always get current value!

    this.getProduct();
  }

 async getProduct() {
    const data = await this.productService.getAll();
    // console.log('data-', data);
    if(data){
      this.products = data.data;
      console.log('this.products-', this.products);
    }
  }

  add2cart(qty,product){
    this.cart.products.push(product);
    this.cart.cart = this.cart.cart + qty;

    //--part Cart Summary
    //--set in data service
    let _price = product.pPriceSale ? product.pPriceSale : product.pPrice;
    this.cart.subTotal = this.cart.subTotal + _price;
    this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;

    this.dataService.updateCart(this.cart);
    console.log('this.cart--', this.cart);
  }
  buynow(){
    this.router.navigate(["cart"]);
  }

  recentClick(slug){
    const recent = this.productService.recentClick(slug);
    if(recent){
      console.log('recent-', recent);
    }
  }

}

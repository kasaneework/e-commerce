import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../share/data.service'
import axios from 'axios';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/share/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  cart:any;
  products;
  product;
  slug;
  qtyDefault=1;
  pImageDefault;
  pImages=[];
  ImagesAll = [];
  imgPath: string = environment.image_path;

  constructor(
    private dataService:DataService,
    private productService:ProductService,
    private router: Router,
    private actRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      console.log('this.slug--1-', this.slug);
    });

    this.dataService.currentCart.subscribe(editCart => (this.cart= editCart)); //<= Always get current value!

    this.getSlug(this.slug);
  }

  // Want to use async/await? Add the `async` keyword to your outer function/method.
  async getSlug(slug) {

    console.log('getSlug');
    const res = await this.productService.getSlug(slug);

    if(res.status === 200){
      this.product = res.data.data;
      console.log('product->>', this.product);
      this.pImageDefault = this.product.pImageDefault;
      // this.pImages = this.product.pImages;

      let tmp_images = this.product.pImages.split(',');
      if(tmp_images){
        tmp_images.forEach( (value, index) => {
          // this.ImagesAll.push({name: value, url: this.imagePath + value});
          this.ImagesAll.push({name: value});
        });
      }
      console.log('this.ImagesAll->>', this.ImagesAll);
    }else{
      console.log(res.message);
      this.router.navigate(["products"]);
    }
  }

  add2cart(qty,product){
    let n=0;
    for(n; n<qty; n++){
      this.cart.products.push(product);

      //--part Cart Summary
      //--set in data service
      let _price = product.pPriceSale ? product.pPriceSale : product.pPrice;
      this.cart.subTotal = this.cart.subTotal + _price;
      this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;

    }
    this.cart.cart = this.cart.cart + qty;
    this.dataService.updateCart(this.cart);
    console.log('this.cart--', this.cart);
  }
  buynow(){
    this.router.navigate(["cart"]);
  }
  minus(){
    console.log('minus');
    if(this.qtyDefault > 1){
      this.qtyDefault--;
    }
  }
  plus(){
    console.log('plus');
    this.qtyDefault++;
  }
}

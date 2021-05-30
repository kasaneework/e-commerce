import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../share/data.service'
import axios from 'axios';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products;
  cart;
  cartItem=[]; // for car list show
  imgPath: string = environment.image_path;

  constructor(
    private dataService:DataService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dataService.currentCart.subscribe(editCart => (this.cart= editCart)); //<= Always get current value!
      console.log('ngOnInit-this.cart--', this.cart);
    if(this.cart){
      this.cartList(this.cart);
    }
  }

  cartList(items){
    //--reset evrytime call
    this.cartItem = [];

    console.log('items--', items.products);

    items.products.forEach( (item, index) => {
      console.log('item--', item);
      if(index<=0){
        //--first loop
        //--add new
        //--set data object
        let tmpData = {
          pId : item.id,
          qty: 1,
          price: item.pPriceSale ? item.pPriceSale: item.pPrice,
          data: item
          };
        this.cartItem.push(tmpData);
      }else{
        //---------------
        // after first loop check same pId and add qty
        if(this.cartItem[this.cartItem.findIndex(obj => obj.pId === item.id)]){
          //-- if have
          //-- get data old one
          let currentData = this.cartItem[this.cartItem.findIndex(obj => obj.pId === item.id)];
          //--update qty
          currentData.qty = currentData.qty+1;
        }else{
          //-- if not have yet
          //--add new same the first loop
          let tmpData = {
            pId: item.id,
            qty: 1,
            price: item.pPriceSale ? item.pPriceSale: item.pPrice,
            data: item
          }
          this.cartItem.push(tmpData);
        }
        //---------------
      }
    });
    //-- let see value
    console.log('cartItem--', this.cartItem);
  }

  minus(product){
    //--add new item
    this.add2cart('minus', product);
    //--reload this
    this.ngOnInit()
  }
  plus(product){
    //--add new item
    this.add2cart('plus', product);
    //--reload this again
    this.ngOnInit()
  }
  add2cart(type,product){
    if(type === 'plus'){
      this.cart.products.push(product);
      this.cart.cart = this.cart.cart + 1; //cart qty

      //--part Cart Summary
      //--set in data service
      let _price = product.pPriceSale ? product.pPriceSale : product.pPrice; //check if have pricesale
      this.cart.subTotal = this.cart.subTotal + _price;
      this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;


    }else{
      //--minus
      //--remove from cart
      if(this.cart.products.findIndex(obj => obj.pId === product.pId) >= 0){ //--if not found it retun -1
        // console.log('index-sss-', this.cart.products.findIndex(obj => obj.pId === product.pId));
        let tmpIndex = this.cart.products.findIndex(obj => obj.pId === product.pId);
        // arr.splice(index, 1);
        this.cart.products.splice(tmpIndex, 1); //--remove 1 list
        this.cart.cart = this.cart.cart - 1; //--minus cart count

        //--part Cart Summary
        //--set in data service
        let _price = product.pPriceSale ? product.pPriceSale : product.pPrice;
        this.cart.subTotal = this.cart.subTotal - _price;
        this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;

      }
    }
    this.dataService.updateCart(this.cart);

    console.log('this.cart--', this.cart);
  }

  removeCart(pId){
    //--find on cartItem list
    this.cartItem.forEach( (item , index) => {
      if(item.pId === pId){
        //--remove as qty on cartItem
        let n=0;
        for(n; n < item.qty; n++){
          this.add2cart('minus', item.data);
        }
        this.cartItem.splice(index, 1); //--remove 1 list
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from 'src/data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
cartData:cart[]|undefined;
priceSummary:priceSummary={
  price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
}
  constructor(private product:ProductService) {}

  ngOnInit(): void {
      this.product.currentCart().subscribe((result)=>{
        this.cartData=result;
        let price=0;
        result.forEach((item)=>{
          if(item.quantity){
            price=price+(+item.price*+item.quantity);
          }
        });
        this.priceSummary.price=price;
        this.priceSummary.discount=price/10;
        this.priceSummary.tax=Math.round((price/100)*18);
        this.priceSummary.delivery=100;
        this.priceSummary.total=Math.round(price-(price/10)+((price/100)*18)+100)
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from 'src/data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
orderData:order[]|undefined;
  constructor(private product:ProductService){}

ngOnInit(): void {
    this.getOrderList();
}

cancelOrder(orderId:number|undefined){
  orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
    console.warn(result);
    this.getOrderList()
  });
}

getOrderList(){
  this.product.orderList().subscribe((result)=>{
    console.warn('order API called');
    this.orderData=result;
  });
}

}
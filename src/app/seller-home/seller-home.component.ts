import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from 'src/data-type';
import { faTrashCan,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productMessage: undefined | string;
  productList: undefined | product[];
  icon=faTrashCan;
  deleteIcon=faEdit;
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    console.warn("test id", id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product Successfully Deleted";
        this.list();

      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }

}

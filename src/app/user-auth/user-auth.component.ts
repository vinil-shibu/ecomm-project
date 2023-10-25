import { Component, OnInit } from '@angular/core';
import { Login, SignUp, cart, product } from 'src/data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError:string=""
  constructor(private user: UserService, private product:ProductService) {

  }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSighUp(data);
    this.localCartToRemoteCart()
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError="Please enter valid user details"
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart'); 
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      
      cartDataList.forEach((product:product,index) => {
        let cartData:cart={
          ...product,
          productId:product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("Item Added");
            }
          });
        }, 1000);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      });
    }
    setTimeout(() => {
      let usr = localStorage.getItem('user');
      let usrId = usr && JSON.parse(usr).id;
      console.warn(usrId);
      
       this.product.getCartList(usrId);
    }, 2000);
  }
}

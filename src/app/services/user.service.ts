import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from 'src/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSighUp(user:SignUp){
    this.http.post("http://localhost:3000/users",user,{observe:"response"}).subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        console.warn(result.body);
        this.router.navigate(['/'])
      }
    })
  }
  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
    console.warn(result);
    if(result && result.body){
      localStorage.setItem('user',JSON.stringify(result.body[0]));
        console.warn(result.body[0]);
        this.router.navigate(['/'])
    }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}

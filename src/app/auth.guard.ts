import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterStateSnapshot,UrlTree,ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { SellerService } from './services/seller.service';



@Injectable({
  providedIn:'root'
})
class AuthGuard {
  constructor(private sellerServices: SellerService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(localStorage.getItem('seller')){
        return true;
      }
    return this.sellerServices.isSellerLoggedIn.getValue();
    }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean => {
  return inject(AuthGuard).canActivate(route,state);
}; 

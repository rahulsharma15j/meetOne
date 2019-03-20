import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuard implements CanActivate {
  constructor(private router:Router, private appService:AppService){}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
     if(this.appService.userType === 'admin'){
        return true;
     }else{
      this.router.navigate(['/dashboard/user']);
      return false;
     }
     
   }
  
}

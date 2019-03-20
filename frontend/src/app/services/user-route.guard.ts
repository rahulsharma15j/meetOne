import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuard implements CanActivate {

  constructor(private router:Router, private appService:AppService){
    
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
     if(this.appService.userType === 'normal'){
        return true;
     }else{
      this.router.navigate(['/dashboard/admin']);
      return false;
     }
     
   }
  
}

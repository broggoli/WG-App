import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "./_services"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private Auth: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // If the user isn't logged in he gets redirected to the main login page
    console.log(this.asd())
    return this.asd()
  }
  asd() { 
    return this.Auth.isLoggedIn.pipe(map(res1 => {
      return res1.local
    }))
  }


  knd() {
    return this.Auth.isLoggedIn.pipe(map(res1 => {
      if(res1.local === true) {
        res1.online.pipe(map( res2 => {
          if( res2.success === true ) {
            if( JSON.parse(res2.data) === true ) {
              return true
            }else {
              this.router.navigate([""])
              return false
            }
          }else {
            this.router.navigate([""])
            return false
          }
        }))
      }else {
        this.router.navigate([""])
        return false
      }
    }))
  }
}
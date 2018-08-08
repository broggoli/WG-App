import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    const loginStatus = this.Auth.isLoggedIn
    if( loginStatus.local === true ) {
      return this.getOnlineLoginStatus(loginStatus.online)
    }else {
      return false
    }
  }
  getOnlineLoginStatus(online: Observable<boolean>) {
    return online.pipe(tap( res => {
      console.log(res)
      return res
    }))
  }
}
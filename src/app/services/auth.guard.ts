import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const onlineUserEmail = localStorage.getItem('onlineUser');
        if (onlineUserEmail) {

            const onlineUserData = JSON.parse(localStorage.getItem(onlineUserEmail));
            const token = onlineUserData.token;
            if (token) {
                return true;
            } else {
                console.log('hello')
                this.router.navigate(['login']);
                return false;
            }
        } else {
            this.router.navigate(['login']);
            return false;
        }



    }

}
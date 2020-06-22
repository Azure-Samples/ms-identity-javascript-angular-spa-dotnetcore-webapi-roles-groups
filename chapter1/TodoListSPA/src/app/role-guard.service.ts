import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
    providedIn: 'root'
  })
export class RoleGuardService implements CanActivate {

  constructor(private authService: MsalService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    
    if (!this.authService.getAccount().idTokenClaims.roles) {
      window.alert('Token does not have roles claim');
      return false;
    } else if (!this.authService.getAccount().idTokenClaims.roles.includes(expectedRole)) {
        window.alert('You do not have access for this');
        return false;
    }

    return true;
  }
}
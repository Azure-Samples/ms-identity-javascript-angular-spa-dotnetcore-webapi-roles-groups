import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class GroupGuardService implements CanActivate {

  constructor(private authService: MsalService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    
    if (!this.authService.getAccount().idTokenClaims.groups) {
      window.alert('Token does not have groups claim');
      return false;
    } else if (!this.authService.getAccount().idTokenClaims.groups.includes(expectedRole)) {
        window.alert('You do not have access for this');
        return false;
    }

    return true;
  }
}
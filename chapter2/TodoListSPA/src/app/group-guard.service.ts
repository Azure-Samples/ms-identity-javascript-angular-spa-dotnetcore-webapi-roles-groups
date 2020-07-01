import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { 
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class GroupGuardService implements CanActivate {

  constructor(private authService: MsalService) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedGroup = route.data.expectedGroup;
    
    if (!this.authService.getAccount().idTokenClaims.groups) {
      window.alert('Token does not have groups claim');
      return false;
    } else if (!this.authService.getAccount().idTokenClaims.groups.includes(expectedGroup)) {
        window.alert('You do not have access for this');
        return false;
    }

    return true;
  }
}
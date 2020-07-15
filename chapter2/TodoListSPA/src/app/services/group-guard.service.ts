import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { GraphService } from './graph.service';

@Injectable({
    providedIn: 'root'
  })
export class GroupGuardService implements CanActivate {

  constructor(private authService: MsalService, private service: GraphService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.service.user.displayName = this.authService.getAccount().idTokenClaims.preferred_username;

    if (this.authService.getAccount().idTokenClaims.groups) {
      this.service.user.groupIDs = <string[]><unknown>this.authService.getAccount().idTokenClaims.groups;
    }

    const expectedGroup = route.data.expectedGroup;

    this.service.user.displayName = this.authService.getAccount().idTokenClaims.preferred_username
    if (this.service.user.groupIDs.length === 0) {

      if (this.authService.getAccount().idTokenClaims.hasgroups) { 
        window.alert('You have too many group memberships. The application will now query Microsoft Graph to get the full list of groups that you are a member of.');
        this.router.navigate(['/overage']);
        return false;
      }

      window.alert('Token does not have groups claim');
      return false;
    } else if (!this.service.user.groupIDs.includes(expectedGroup)) {
      window.alert('You do not have access for this');
      return false;
    }

    return true;
  }
}
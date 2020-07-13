import { InteractionRequiredAuthError, AuthError } from 'msal';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { TodoService } from './todo.service';
import { 
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import * as config from './app-config.json';

@Injectable({
    providedIn: 'root'
  })
export class GroupGuardService implements CanActivate {

  groups: string[];

  constructor(private authService: MsalService, private service: TodoService) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedGroup = route.data.expectedGroup;
    
    if (!this.authService.getAccount().idTokenClaims.groups) {

      if (this.authService.getAccount().idTokenClaims.hasgroups) { 
        window.alert('You have too many group memberships. The application will now query Microsoft Graph to get the full list of groups that you are a member of.');
        
        this.service.getGroups().subscribe({
          next: (response: any) => {
            this.groups = response.value.map(v => v.id);
          },
          error: (err: AuthError) => {
            console.log(err)
            // If there is an interaction required error,
            // call one of the interactive methods and then make the request again.
            if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
              this.authService.acquireTokenPopup({
                scopes: this.authService.getScopesForEndpoint(config.resources.graphApi.resourceUri)
              })
              .then(() => {
                this.service.getGroups()
                  .toPromise()
                  .then((response: any)  => {
                    this.groups = response.value.map(v => v.id);
                  });
              });
            }
          }
        });

        if (this.groups && this.groups.includes(expectedGroup)) {
          return true;
        } else {
          return false;
        }
      }

      window.alert('Token does not have groups claim');
      return false;
    } else if (!this.authService.getAccount().idTokenClaims.groups.includes(expectedGroup)) {
      window.alert('You do not have access for this');
      return false;
    }

    return true;
  }
}
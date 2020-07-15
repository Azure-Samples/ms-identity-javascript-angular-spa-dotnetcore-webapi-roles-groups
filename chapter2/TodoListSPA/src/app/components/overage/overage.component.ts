import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { GraphService } from '../../services/graph.service';
import { User } from '../../interfaces/user';
import * as config from '../../app-config.json';

@Component({
  selector: 'app-overage',
  templateUrl: './overage.component.html',
  styleUrls: ['./overage.component.css']
})
export class OverageComponent implements OnInit {

  groups: string[];

  constructor(private authService: MsalService, private service: GraphService) { }

  ngOnInit(): void {
    this.service.getGroups().subscribe({
      next: (response: any) => {
        this.groups = response.value.map(v => v.id);

        if (this.groups.includes(config.groups.groupAdmin)) {
          this.service.user.groupIDs.push(config.groups.groupAdmin)
        }

        if (this.groups.includes(config.groups.groupMember)) {
          this.service.user.groupIDs.push(config.groups.groupMember)
        }
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

                if (this.groups.includes(config.groups.groupAdmin)) {
                  this.service.user.groupIDs.push(config.groups.groupAdmin)
                }
        
                if (this.groups.includes(config.groups.groupMember)) {
                  this.service.user.groupIDs.push(config.groups.groupMember)
                }
              });
          });
        }
      }
    });
  }

}

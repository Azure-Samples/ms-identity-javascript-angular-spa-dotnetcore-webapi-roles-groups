import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { GraphService } from '../../services/graph.service';
import * as config from '../../app-config.json';

@Component({
  selector: 'app-overage',
  templateUrl: './overage.component.html',
  styleUrls: ['./overage.component.css']
})
export class OverageComponent implements OnInit {

  groups: string[] = [];

  constructor(private authService: MsalService, private service: GraphService, private http: HttpClient) { }

  ngOnInit(): void {
    this.handleResponse()
  }

  handleResponse(): void {
    this.service.getGroups().subscribe({
      next: (response: any) => {

        response.value.map(v => this.groups.push(v.id));

        if (response['@odata.nextLink']) {
          this.handleNextPage(response['@odata.nextLink'])
        } else {
          if (this.groups.includes(config.groups.groupAdmin)) {
            this.service.user.groupIDs.push(config.groups.groupAdmin)
          }

          if (this.groups.includes(config.groups.groupMember)) {
            this.service.user.groupIDs.push(config.groups.groupMember)
          }
        }

        console.log(this.groups);
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

                response.value.map(v => this.groups.push(v.id));

                if (response['@odata.nextLink']) {
                  this.handleNextPage(response['@odata.nextLink'])
                } else {
                  if (this.groups.includes(config.groups.groupAdmin)) {
                    this.service.user.groupIDs.push(config.groups.groupAdmin)
                  }
        
                  if (this.groups.includes(config.groups.groupMember)) {
                    this.service.user.groupIDs.push(config.groups.groupMember)
                  }
                }
                console.log(this.groups);
              });
          });
        }
      }
    });
  }

  handleNextPage(nextPage): void {
    this.service.getNextPage(nextPage)
      .subscribe((response: any) => {

        response.value.map(v => {
          if (!this.groups.includes(v.id)) {
            this.groups.push(v.id);
          }
        });

        if (response['@odata.nextLink']) {
          this.handleNextPage(response['@odata.nextLink'])
        } else {
          if (this.groups.includes(config.groups.groupAdmin)) {
            this.service.user.groupIDs.push(config.groups.groupAdmin)
          }

          if (this.groups.includes(config.groups.groupMember)) {
            this.service.user.groupIDs.push(config.groups.groupMember)
          }
        }
      })
  }
}


// if (this.groups.includes(config.groups.groupAdmin)) {
//   this.service.user.groupIDs.push(config.groups.groupAdmin)
// }

// if (this.groups.includes(config.groups.groupMember)) {
//   this.service.user.groupIDs.push(config.groups.groupMember)
// }

// if (this.groups.includes(config.groups.groupAdmin)) {
//   this.service.user.groupIDs.push(config.groups.groupAdmin)
// }

// if (this.groups.includes(config.groups.groupMember)) {
//   this.service.user.groupIDs.push(config.groups.groupMember)
// }
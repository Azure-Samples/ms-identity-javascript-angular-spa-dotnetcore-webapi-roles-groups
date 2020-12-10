import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import * as auth from './auth-config.json';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  user: User = {
    displayName: "",
    groupIDs: [],
  };
  
  uri = auth.resources.graphApi.resourceUri;

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get(this.uri);
  }

  getNextPage(nextPage: any) {
    return this.http.get(nextPage);
  }
}

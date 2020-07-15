import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import * as config from '../app-config.json';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  user: User = {
    displayName: "",
    groupIDs: [],
  };

  graphUri = config.resources.graphApi.resourceUri;

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get(this.graphUri);
  }
}

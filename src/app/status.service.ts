import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from './status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  getStatuses(): Observable<Status[]> {
      return this.httpClient.get<Status[]>("http://localhost:3000/statuses");
  }
}

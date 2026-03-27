import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  devices: string[];
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contact/send`;

  constructor(private http: HttpClient) {}

  send(data: ContactRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
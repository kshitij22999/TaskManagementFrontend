import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:5000/auth';

  constructor(private http:HttpClient) { }

  isLoggedIn(): boolean {
    const session = localStorage.getItem('session');
    return !!session;
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.status === 200 && response.body) {
            console.log(response);
            localStorage.setItem('session', JSON.stringify(response.body));
          }
        })
      );
  }

}

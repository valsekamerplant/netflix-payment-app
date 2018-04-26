import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public token: string;
  public user: string;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.user = currentUser && currentUser.user;
  }

  register(user: any ) {
    const regUrl = `${environment.apiUrl}register`;

    return this.http.post(regUrl, user)
        .pipe(
            catchError(this.handleError<any>('register'))
        );
  }

  authenticate(email: string, password: string): Observable<any> {
    const authUrl = `${environment.apiUrl}authenticate`;
    const cred = { email: email, password: password};
    return this.http.post(authUrl, cred).map((response: any) => {
      if (response.token) {
          this.token = response.token.accessToken;
          this.user = response.user.id;
          localStorage.setItem('currentUser', JSON.stringify({ user: this.user, token: this.token }));
          return true;
      } else {
        return false;
      }
    });
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
  }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}

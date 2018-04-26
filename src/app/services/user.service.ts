import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { User } from '../model/User';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private userUrl = environment.apiUrl + 'subscribers';

  constructor(
      private authService: AuthService,
      private messageService: MessageService,
      private http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, this.httpOptions())
        .pipe(
            tap(users => this.log(`fetched users`)),
            catchError(this.handleError('getUsers', []))
        );
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
        this.messageService.add('UserService: ' + message);
  }

  getUser(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url, this.httpOptions()).pipe(
        tap( _ => this.log(`fetched user with id: ${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: User): Observable<User[]> {
      return this.http.post<User[]>(this.userUrl, user, this.httpOptions())
          .pipe(
              tap(_ => this.log(`added user ${user.name}`)),
              catchError(this.handleError<User[]>('addUser'))
          );
  }

  updateUser(user: User): Observable<any> {
      const url = `${this.userUrl}/${user._id}`;
      return this.http.put(url, user, this.httpOptions()).pipe(
          tap(_ => this.log(`updated user id=${user._id}`)),
          catchError(this.handleError<any>('updateUser'))
      );
  }

  removeUser(id: string): Observable<User[]> {
      const url = `${this.userUrl}/${id}/delete`;
      return this.http.get<User[]>(url, this.httpOptions()).pipe(
          tap( _ => this.log(`deleted user with id: ${id}`)),
          catchError(this.handleError<any>('removeUser'))
      );
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private httpOptions() {
      const headers = {
          'x-access-token': '' + this.authService.token,
          'user': '' + this.authService.user,
          'Content-Type': 'application/json',
      };
      return { headers: new HttpHeaders(headers) };
  }
}

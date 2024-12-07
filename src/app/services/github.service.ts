import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {Store} from '@ngrx/store';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { AppState } from '../store/app.state';
import { Repository } from '../models/repository.model';
import { clearToken } from '../store/app.action';
import { selectToken } from '../store/app.selector';
@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl = 'https://api.github.com';
  private userEndpoint = `${this.baseUrl}/user`;
  private repoEndpoint = `${this.baseUrl}/user/repos`


  constructor(
     private http: HttpClient,
     private store:Store<AppState> ,
     private router: Router) { }



  private getToken(): Observable<string> {
    return this.store.select(selectToken).pipe(
      map((token) => {
        if(!token) {
          this.router.navigate(['/login']);
          throw new Error('No token available. Redirecting to login.')
        }
        return token;
      })
    )
  }
  getUserInfo(): Observable<any>{

    return this.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({Authorization: `Bearer ${token}`,});
        return this.http.get(this.userEndpoint, {headers});
      }),
      catchError((error) => this.handleError(error))
    );
  }

  getRepositories(): Observable<Repository[]>{
    return this.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<Repository[]>(this.repoEndpoint,{headers})
      }),
      catchError((error) => this.handleError(error))
    );
  }

  getRepositoryDetails(repoId: string): Observable<any> {
    return this.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        const url = `${this.repoEndpoint}/${repoId}`;
        return this.http.get(url, {headers})
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error in GitHub Service: ', error);
    return throwError(() => new Error('An error occurred. Please try again.'))
  }


  logout(): void {
    this.store.dispatch(clearToken());
    this.router.navigate(['/login']);
  }
}
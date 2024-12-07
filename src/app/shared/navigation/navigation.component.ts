import { Component } from '@angular/core';
import { selectToken, selectUser } from '../../store/app.selector';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { SharedModule } from '../shared.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [SharedModule,NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  token$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private githubService: GithubService,
    private router: Router
  ) {
    this.token$ = this.store.select(selectToken);
  }

  logout(): void {
    this.githubService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

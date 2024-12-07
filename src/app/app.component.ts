import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from './services/github.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectToken } from './store/app.selector';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NgIf } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavigationComponent,SharedModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'github-client';
  token$: Observable<string | null>;

  constructor(private githubService: GithubService, private store: Store<AppState>) {
    // نظارت بر مقدار token از طریق store
    this.token$ = this.store.select(selectToken);
  }

  logout(): void {
    this.githubService.logout();
  }
}

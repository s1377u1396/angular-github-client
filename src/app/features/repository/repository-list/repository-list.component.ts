import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Repository } from '../../../models/repository.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectError, selectLoading, selectRepositories } from '../../../store/app.selector';
import { loadRepositories, loadRepositoriesFailure, loadRepositoriesSuccess } from '../../../store/app.action';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [SharedModule,NgFor,NgIf],
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.css'
})
export class RepositoryListComponent {
  repositories$: Observable<Repository[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchTerm: string = '';

  constructor(private store: Store<AppState>, private githubService: GithubService) {
    this.repositories$ = this.store.select(selectRepositories);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.loadRepositories();
  }

  loadRepositories(): void {
    this.store.dispatch(loadRepositories()); // بارگذاری شروع شده

    this.githubService.getRepositories().subscribe({
      next: (repositories) => {
        this.store.dispatch(loadRepositoriesSuccess({ repositories })); // ذخیره موفقیت‌آمیز مخازن
      },
      error: (err) => {
        console.error('Error fetching repositories:', err);
        this.store.dispatch(loadRepositoriesFailure({ error: err.message })); // ذخیره خطا
      },
    });
  }

  filteredRepositories(repos: Repository[]): Repository[] {
    if (!this.searchTerm.trim()) {
      return repos;
    }
    return repos.filter((repo) =>
      repo.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

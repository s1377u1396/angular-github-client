import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { GithubService } from '../../services/github.service';
import { NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectToken, selectUser } from '../../store/app.selector';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule,NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user$: Observable<User | null> | undefined ;
  token$: Observable<string | null> | undefined;
  loading: boolean = false;
  error: Observable<any> | undefined;
  
  

  constructor(
    private githubService: GithubService,
    private store: Store<AppState>,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.token$ = this.store.select(selectToken);
  }

  RepositoryList() {
    this.githubService.getRepositories()
    }


    refresh(): void {
      // منطق تازه‌سازی اطلاعات (به عنوان مثال فراخوانی دوباره API)
      console.log('Refreshing user data...');
      this.loading = true;
  
      setTimeout(() => {
        this.loading = false;
        console.log('User data refreshed!');
      }, 2000); // شبیه‌سازی یک فراخوانی API
    }
  
    goBack(): void {
      // بازگشت به صفحه قبلی
      this.location.back();
    }
    
    

  

}

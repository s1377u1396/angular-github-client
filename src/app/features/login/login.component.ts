import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgIf } from '@angular/common';
import {Store} from '@ngrx/store';

import { User } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { login, setUser } from '../../store/app.action';
import { selectToken } from '../../store/app.selector';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  user: User | null = null;

  

  constructor(
    private fb: FormBuilder ,
    private githubService: GithubService , 
    private store: Store,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      token: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      


      const token = this.loginForm.value.token;
      this.store.dispatch(login({token}));
      this.store.select(selectToken).subscribe((token) => {
        console.log('Token in store:', token);
      });

      this.githubService.getUserInfo().subscribe({
        next: (user: User) => {
         
          this.store.dispatch(setUser({user}))
          console.log('User Info:' , user);
          this.router.navigate(['/profile']);
          
        },
        error: (err) => {
          console.log('Error fetching user info:', err);
        },
      });
      
    }
  }

}
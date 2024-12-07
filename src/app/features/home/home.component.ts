import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { selectToken } from '../../store/app.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isPopupOpen: boolean = false;
  popupTitle: string = '';
  token$: Observable<string | null> | undefined;
  constructor(private store: Store<AppState>, private router: Router, private githubService: GithubService){

    this.store.select(selectToken).subscribe((token: any) => {
      if(token){
        this.token$ = token;
        console.log(this.token$);
      }
    });
  }





  openPopup(title: string): void {
    if(this.token$){
      if(title === "Explore Repositories")
      {
        this.router.navigate(["/repository"])
        this.popupTitle = title;
        this.isPopupOpen = true;
      }

    
    else  if(title === "Track Users"){
      this.router.navigate(["/profile"])
      this.popupTitle = title;
      this.isPopupOpen = true;
    }
  
  else if (title === "Secure Logout"){
    this.githubService.logout();
    this.router.navigate(["/login"])
    this.popupTitle = title;
    this.isPopupOpen = true;
  }
}
}

  closePopup(): void {
    this.isPopupOpen = false;
  }

  startwithlogin(){
    this.router.navigate(['/login']);
  }

}

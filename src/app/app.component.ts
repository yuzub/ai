import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { inspect } from 'util';

@Component({
  selector: 'ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AI';
  loading: boolean = true;

  constructor(public authService: AuthService) {}


}

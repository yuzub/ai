import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AI';

  constructor(public authService: AuthService) {}
}

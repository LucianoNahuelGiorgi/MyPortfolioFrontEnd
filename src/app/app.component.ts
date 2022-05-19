import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Portfolio';

  ngOnInit(): void {
    initializeApp(environment.firebaseConfig);
  }
}

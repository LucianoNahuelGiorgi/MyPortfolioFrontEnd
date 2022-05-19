import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from 'src/app/interfaces/header.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public header: Header[];
  public updateHeader: Header;
  public deleteHeader: Header;

  constructor(private headerService: HeaderService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getHeader();
  }

  public getHeader(): void {
    this.headerService.getHeader().subscribe(
      (response: Header[]) => {
        this.header = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onLoginHeader(loginForm: NgForm): void{
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.authService.login(email, password);
  }

  authenticated(){
    return this.authService.authenticated();
  }

  onLogoutHeader(): void{
    this.authService.logout();
  }

  public onUpdateHeader(header: Header): void {
    this.headerService.updateHeader(header).subscribe(
      (response: Header) => {
        this.getHeader();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(header: Header, mode: string): void {
    const container = document.getElementById('header-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'login') {
      button.setAttribute('data-bs-target', '#login-modal-header');
    }
    if (mode === 'logout') {
      button.setAttribute('data-bs-target', '#logout-modal-header');
    }
    if (mode === 'edit') {
      this.updateHeader = header;
      button.setAttribute('data-bs-target', '#edit-modal-header');
    }
    container.appendChild(button);
    button.click();
  }
}
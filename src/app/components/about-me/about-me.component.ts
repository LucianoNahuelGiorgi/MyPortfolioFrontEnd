import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AboutMe } from 'src/app/interfaces/about-me.interface';
import { AboutMeService } from 'src/app/services/about-me.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public aboutMe: AboutMe[];
  public updateAboutMe: AboutMe;
  public deleteAboutMe: AboutMe;

  constructor(private aboutMeService: AboutMeService, private authService: AuthService) { }

  ngOnInit() {
    this.getAboutMe();
  }

  authenticated(){
    return this.authService.authenticated();
  }

  public getAboutMe(): void{
    this.aboutMeService.getAboutMe().subscribe(
      (response: AboutMe[]) => {
        this.aboutMe = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /*
  public onAddAboutMe(addForm: NgForm): void {
    this.aboutMeService.addAboutMe(addForm.value).subscribe(
      (response: AboutMe) => {
        console.log(response);
        this.getAboutMe();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  */

  public onUpdateAboutMe(aboutMe: AboutMe): void {
    this.aboutMeService.updateAboutMe(aboutMe).subscribe(
      (response: AboutMe) => {
        console.log(response);
        this.getAboutMe();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /*
  public onDeleteAboutMe(aboutMeId: number): void {
    this.aboutMeService.deleteAboutMe(aboutMeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAboutMe();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  */

  public onOpenModal(aboutMe: AboutMe, mode: string): void {
    const container = document.getElementById('am-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#add-modal-am');
    }
    if (mode === 'edit') {
      this.updateAboutMe = aboutMe;
      button.setAttribute('data-bs-target', '#edit-modal-am');
    }
    if (mode === 'delete') {
      this.deleteAboutMe = aboutMe;
      button.setAttribute('data-bs-target', '#delete-modal-am');
    }
    container.appendChild(button);
    button.click();
  }
}
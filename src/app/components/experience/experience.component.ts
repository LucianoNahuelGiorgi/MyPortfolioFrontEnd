import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experience } from 'src/app/interfaces/experience.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  public experience: Experience[];
  public updateExperience: Experience;
  public deleteExperience: Experience;
  private dateIn: Date;
  private dateOut: Date;

  constructor(private experienceService: ExperienceService, private authService: AuthService) { }

  ngOnInit() {
    this.getExperience();
  }

  authenticated() {
    return this.authService.authenticated();
  }

  public getExperience(): void {
    this.experienceService.getExperience().subscribe(
      (response: Experience[]) => {
        this.experience = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public differenceDateExperience() {
    this.experienceService.getExperience().subscribe(
      (response: Experience[]) => {
        this.experience = response;
        this.experience.forEach
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddExperience(addForm: NgForm): void {
    this.experienceService.addExperience(addForm.value).subscribe(
      (response: Experience) => {
        this.getExperience();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateExperience(experience: Experience): void {
    this.experienceService.updateExperience(experience).subscribe(
      (response: Experience) => {
        this.getExperience();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteExperience(experienceId: number): void {
    this.experienceService.deleteExperience(experienceId).subscribe(
      (response: void) => {
        this.getExperience();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenAddModal(): void {
    const ctnAdd = document.getElementById('experience-container')!;
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.style.display = 'none';
    btnAdd.setAttribute('data-bs-toggle', 'modal');
    btnAdd.setAttribute('data-bs-target', '#add-modal-experience');
    ctnAdd.appendChild(btnAdd);
    btnAdd.click();
  }

  public onOpenModal(experience: Experience, mode: string): void {
    const container = document.getElementById('experience-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.updateExperience = experience;
      button.setAttribute('data-bs-target', '#edit-modal-experience');
    }
    if (mode === 'delete') {
      this.deleteExperience = experience;
      button.setAttribute('data-bs-target', '#delete-modal-experience');
    }
    container.appendChild(button);
    button.click();
  }
}
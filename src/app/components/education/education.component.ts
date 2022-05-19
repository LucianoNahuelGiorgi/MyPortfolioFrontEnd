import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/interfaces/education.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public education: Education[];
  public updateEducation: Education;
  public deleteEducation: Education;

  constructor(private educationService: EducationService, private authService: AuthService) { }

  ngOnInit() {
    this.getEducation();
  }

  authenticated(){
    return this.authService.authenticated();
  }

  public getEducation(): void{
    this.educationService.getEducation().subscribe(
      (response: Education[]) => {
        this.education = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEducation(addForm: NgForm): void {
    this.educationService.addEducation(addForm.value).subscribe(
      (response: Education) => {
        this.getEducation();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEducation(education: Education): void {
    this.educationService.updateEducation(education).subscribe(
      (response: Education) => {
        this.getEducation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEducation(educationId: number): void {
    this.educationService.deleteEducation(educationId).subscribe(
      (response: void) => {
        this.getEducation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenAddModal(): void {
    const container = document.getElementById('education-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#add-modal-education');
    container.appendChild(button);
    button.click();
  }

  public onOpenModal(education: Education, mode: string): void {
    const container = document.getElementById('education-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.updateEducation = education;
      button.setAttribute('data-bs-target', '#edit-modal-education');
    }
    if (mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-bs-target', '#delete-modal-education');
    }
    container.appendChild(button);
    button.click();
  }
}
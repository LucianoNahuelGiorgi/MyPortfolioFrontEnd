import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/interfaces/project.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public project: Project[];
  public updateProject: Project;
  public deleteProject: Project;

  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit() {
    this.getProject();
  }

  authenticated(){
    return this.authService.authenticated();
  }

  public getProject(): void{
    this.projectService.getProject().subscribe(
      (response: Project[]) => {
        this.project = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProject(addForm: NgForm): void {
    this.projectService.addProject(addForm.value).subscribe(
      (response: Project) => {
        this.getProject();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProject(project: Project): void {
    this.projectService.updateProject(project).subscribe(
      (response: Project) => {
        this.getProject();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(
      (response: void) => {
        this.getProject();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenAddModal(): void {
    console.log("dentro de onOpenAddModal");
    const ctnAdd = document.getElementById('project-container')!;
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.style.display = 'none';
    btnAdd.setAttribute('data-bs-toggle', 'modal');
    btnAdd.setAttribute('data-bs-target', '#add-modal-project');
    ctnAdd.appendChild(btnAdd);
    btnAdd.click();
  }

  public onOpenModal(project: Project, mode: string): void {
    const container = document.getElementById('project-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.updateProject = project;
      button.setAttribute('data-bs-target', '#edit-modal-project');
    }
    if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-bs-target', '#delete-modal-project');
    }
    container.appendChild(button);
    button.click();
  }
}
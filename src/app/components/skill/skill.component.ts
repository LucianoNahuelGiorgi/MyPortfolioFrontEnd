import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/interfaces/skill.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  public skill: Skill[];
  public updateSkill: Skill;
  public deleteSkill: Skill;

  constructor(private skillService: SkillService, private authService: AuthService) { }

  ngOnInit() {
    this.getSkill();
  }

  authenticated(){
    return this.authService.authenticated();
  }

  public getSkill(): void{
    this.skillService.getSkill().subscribe(
      (response: Skill[]) => {
        this.skill = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSkill(addForm: NgForm): void {
    this.skillService.addSkill(addForm.value).subscribe(
      (response: Skill) => {
        console.log(response);
        this.getSkill();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSkill(skill: Skill): void {
    this.skillService.updateSkill(skill).subscribe(
      (response: Skill) => {
        console.log(response);
        this.getSkill();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSkill(skillId: number): void {
    this.skillService.deleteSkill(skillId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSkill();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenAddModal(): void {
    const ctnAdd = document.getElementById('skill-container')!;
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.style.display = 'none';
    btnAdd.setAttribute('data-bs-toggle', 'modal');
    btnAdd.setAttribute('data-bs-target', '#add-modal-skill');
    ctnAdd.appendChild(btnAdd);
    btnAdd.click();
  }

  public onOpenModal(skill: Skill, mode: string): void {
    const container = document.getElementById('skill-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.updateSkill = skill;
      button.setAttribute('data-bs-target', '#edit-modal-skill');
    }
    if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-bs-target', '#delete-modal-skill');
    }
    container.appendChild(button);
    button.click();
  }
}
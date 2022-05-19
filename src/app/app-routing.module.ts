import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectComponent } from './components/project/project.component';
import { SkillComponent } from './components/skill/skill.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent, },
  { path: 'about-me', component: AboutMeComponent, },
  { path: 'experience', component: ExperienceComponent, },
  { path: 'education', component: EducationComponent, },
  { path: 'skill', component: SkillComponent, },
  { path: 'project', component: ProjectComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

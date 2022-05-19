import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Skill } from "../interfaces/skill.interface";

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    private apiServeUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getSkill(): Observable<Skill[]> {
        return this.http.get<Skill[]>(`${this.apiServeUrl}/skill/all`);
    }

    public addSkill(skill: Skill): Observable<Skill> {
        return this.http.post<Skill>(`${this.apiServeUrl}/skill/add`, skill);
    }

    public updateSkill(skill: Skill): Observable<Skill> {
        return this.http.put<Skill>(`${this.apiServeUrl}/skill/update`, skill);
    }

    public deleteSkill(skillId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/skill/delete/${skillId}`);
    }
}
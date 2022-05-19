import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Experience } from "../interfaces/experience.interface";

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    private apiServeUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getExperience(): Observable<Experience[]> {
        return this.http.get<Experience[]>(`${this.apiServeUrl}/experience/all`);
    }

    public addExperience(experience: Experience): Observable<Experience> {
        return this.http.post<Experience>(`${this.apiServeUrl}/experience/add`, experience);
    }

    public updateExperience(experience: Experience): Observable<Experience> {
        return this.http.put<Experience>(`${this.apiServeUrl}/experience/update`, experience);
    }

    public deleteExperience(experienceId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/experience/delete/${experienceId}`);
    }
}
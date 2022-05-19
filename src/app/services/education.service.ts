import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Education } from "../interfaces/education.interface";

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    private apiServeUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getEducation(): Observable<Education[]> {
        return this.http.get<Education[]>(`${this.apiServeUrl}/education/all`);
    }

    public addEducation(education: Education): Observable<Education> {
        return this.http.post<Education>(`${this.apiServeUrl}/education/add`, education);
    }

    public updateEducation(education: Education): Observable<Education> {
        return this.http.put<Education>(`${this.apiServeUrl}/education/update`, education);
    }

    public deleteEducation(educationId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/education/delete/${educationId}`);
    }
}
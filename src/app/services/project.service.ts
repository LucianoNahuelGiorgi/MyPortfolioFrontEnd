import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Project } from "../interfaces/project.interface";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private apiServeUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getProject(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiServeUrl}/project/all`);
    }

    public addProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${this.apiServeUrl}/project/add`, project);
    }

    public updateProject(project: Project): Observable<Project> {
        return this.http.put<Project>(`${this.apiServeUrl}/project/update`, project);
    }

    public deleteProject(projectId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/project/delete/${projectId}`);
    }
}
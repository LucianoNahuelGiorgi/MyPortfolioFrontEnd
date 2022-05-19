import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

import { Observable } from "rxjs";
import { AboutMe } from "../interfaces/about-me.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AboutMeService {
    private apiServeUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getAboutMe(): Observable<AboutMe[]> {
        return this.http.get<AboutMe[]>(`${this.apiServeUrl}/about-me/all`);
    }

    public addAboutMe(aboutMe: AboutMe): Observable<AboutMe> {
        return this.http.post<AboutMe>(`${this.apiServeUrl}/about-me/add`, aboutMe);
    }

    public updateAboutMe(aboutMe: AboutMe): Observable<AboutMe> {
        return this.http.put<AboutMe>(`${this.apiServeUrl}/about-me/update`, aboutMe);
    }

    public deleteAboutMe(aboutMeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/about-me/delete/${aboutMeId}`);
    }
}
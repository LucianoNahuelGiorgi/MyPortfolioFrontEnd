import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"

import { Observable } from "rxjs";
import { Header } from "../interfaces/header.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private apiServeUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getHeader(): Observable<Header[]> {
        return this.http.get<Header[]>(`${this.apiServeUrl}/header/all`);
    }

    public addHeader(header: Header): Observable<Header> {
        return this.http.post<Header>(`${this.apiServeUrl}/header/add`, header);
    }

    public updateHeader(header: Header): Observable<Header> {
        return this.http.put<Header>(`${this.apiServeUrl}/header/update`, header);
    }

    public deleteHeader(headerId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeUrl}/header/delete/${headerId}`);
    }
}
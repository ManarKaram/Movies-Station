import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class QueryService {
    constructor(
        private http: HttpClient // Inject httpClient
    ) { }

    // Post Request path , header <option>, data <option>
    postReq(path: string, data?, header?): Observable<any> {
        return this.http.post(`${path}`, data, header);
    }

    // Get Request path , header <option>
    getReq(path: string, header?): Observable<any> {
        return this.http.get(`${path}`, header);
    }

}
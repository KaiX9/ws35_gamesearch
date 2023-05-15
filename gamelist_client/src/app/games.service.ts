import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { Game } from "./models";

const URL = 'http://localhost:8080/games'

@Injectable()
export class GamesService {

    http = inject(HttpClient)

    getGames(limit: number): Observable<Game[]> {
        
        const queryParams = new HttpParams()
            .set("limit", limit)
        return this.http.get<Game[]>(URL, { params: queryParams })
        
    }
}
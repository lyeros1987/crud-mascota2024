import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private myAppUrl: string = environment.endpoint;
  private myAppApi: string = 'api/Mascota/';
  constructor( private http: HttpClient ) { }


  getMascotas(): Observable<Mascota[]>{
   return  this.http.get<Mascota []>(`${this.myAppUrl}${this.myAppApi}`);
  }


  getMascota(id : number):Observable<Mascota>{
    return this.http.get<Mascota>(`${this.myAppUrl}${this.myAppApi}${id}`)
  }

  deleteMascota(id: number): Observable<void>{
     return this.http.delete<void>(`${this.myAppUrl}${this.myAppApi}${id}`)
  }

  addMascota(mascota: Mascota):Observable<Mascota>{
   return  this.http.post<Mascota>(`${this.myAppUrl}${this.myAppApi}`, mascota)

  }
  updateMascota(id:number, mascota: Mascota): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myAppApi}${id}`,mascota)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationData } from '../model/registration-data';
const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // registrations$: Observable<RegistrationData> = this.http.get<RegistrationData>(`${URL}/posts`);

  constructor(private http: HttpClient) {}

  // saveRegistration(formValue: RegistrationData): Observable<RegistrationData> {
  //   console.log(this.http.post<RegistrationData>(`${URL}`, formValue));
  //   return this.http.post<RegistrationData>(`${URL}`, formValue);
  // }

  saveRegistration(
    formValue: RegistrationData,
    userId?: string
  ): Observable<RegistrationData> {
    if (!userId) {
      return this.http.post<RegistrationData>(`${URL}/posts`, formValue); //add new data.
    }
    return this.http.put<RegistrationData>(`${URL}/posts/${userId}`, formValue); //update data.
  }

  getRegistration(id: string): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${URL}/posts/${id}`);
  }

  getRegistrations(): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${URL}/posts`);
  }
}

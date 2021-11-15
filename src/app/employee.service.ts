import { Employee } from './employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private appUrl = environment.appBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.appUrl}/employees`);
  }

  public getOneEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.appUrl}/employee/${id}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.appUrl}/employee`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.appUrl}/employee`, employee);
  }

  public deleteEmployee(id: number): Observable<null> {
    return this.http.delete<null>(`${this.appUrl}/employee/${id}`);
  }
}

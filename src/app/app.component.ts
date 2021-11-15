import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[];
  public employeeToUpdate: Employee;

  ngOnInit(): void {
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService) {}

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onSearchChange(key: string): void {
    let results: Employee[];

    results = this.employees.filter((e) => {
      return (
        e.name.indexOf(key) > -1 ||
        e.email.indexOf(key) > -1 ||
        e.jobTitle.indexOf(key) > -1
      );
    });

    this.employees = results;

    if (!key) {
      this.getEmployees();
    }
  }

  public onDeleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe({
      next: (response: any) => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onUpdateEmployee(form: NgForm): void {
    this.employeeService.updateEmployee(form.value).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddEmployee(form: NgForm): void {
    document.getElementById('add-employee-form')?.click();

    this.employeeService.addEmployee(form.value).subscribe({
      next: (response: Employee) => {
        this.getEmployees();
        form.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(employee: Employee | undefined, mode: string): void {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      btn.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'edit') {
      btn.setAttribute('data-target', '#updateEmployeeModal');
      employee
        ? (this.employeeToUpdate = employee)
        : alert('the one you want is not here anymore');
    } else if (mode === 'delete') {
      btn.setAttribute('data-target', '#deleteEmployeeModal');
      employee
        ? (this.employeeToUpdate = employee)
        : alert('the one you want is not here anymore');
    }

    const container = document.querySelector('.container');
    container?.appendChild(btn);
    btn.click();
  }
}

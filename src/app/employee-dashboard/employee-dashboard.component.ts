import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { EmployeeModels } from './employee-dashboard.models';
import { ApiService } from "../shared/api.service"
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formEmployee!: FormGroup
  employeeModel: EmployeeModels = new EmployeeModels();
  employeeData: any;
  showAdd!: boolean
  showEdit!: boolean
  showupdate!: boolean;

  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      FirstName: new FormControl(),
      Lastname: new FormControl(),
      Email: new FormControl(),
      Telephone: new FormControl(),
      Salary: new FormControl(),
    })
    this.getEmployee()
  }

  postEmployee() {
    this.employeeModel.firstName = this.formEmployee.value.FirstName
    this.employeeModel.LastName = this.formEmployee.value.Lastname
    this.employeeModel.email = this.formEmployee.value.Email
    this.employeeModel.Telephone = this.formEmployee.value.Telephone
    this.employeeModel.Salary = this.formEmployee.value.Salary
    this.api.postEmployee(this.employeeModel)
      .subscribe(res => {
        Swal.fire("Complate", "Add Employee Complete", "success")
        this.getEmployee()
        let close = document.getElementById("close")
        close!.click()

      },
        err => {
          Swal.fire("Error", "Add Employee Error", "error")
        }
      )

  }
  getEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id)
      .subscribe(res => {
        Swal.fire("Complate", "Delete Employee Complete", "success")
        this.getEmployee()

      },
        err => {
          Swal.fire("Error", "Delete Employee Error", "error")
        }
      )
  }
  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showupdate = false
    this.employeeData.id = 0
  }
  clickEdit(data: any){
    this.showAdd = false
    this.showupdate = true
    this.employeeData.id = data.id
    this.formEmployee.controls['FirstName'].setValue(data.firstName)
    this.formEmployee.controls['Lastname'].setValue(data.LastName)
    this.formEmployee.controls['Email'].setValue(data.email)
    this.formEmployee.controls['Telephone'].setValue(data.Telephone)
    this.formEmployee.controls['Salary'].setValue(data.Salary)
  }
  updateEmployee(){
    this.employeeModel.firstName = this.formEmployee.value.FirstName
    this.employeeModel.LastName = this.formEmployee.value.Lastname
    this.employeeModel.email = this.formEmployee.value.Email
    this.employeeModel.Telephone = this.formEmployee.value.Telephone
    this.employeeModel.Salary = this.formEmployee.value.Salary
    this.api.updateEmployee(this.employeeData.id,this.employeeModel)
    .subscribe(res => {
      Swal.fire("Complate", "Update Employee Complete", "success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()

    },
      err => {
        Swal.fire("Error", "Updete Employee Error", "error")
      }
    )
  }
}


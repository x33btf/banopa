import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private service: ConnectionService) { }

  ngOnInit(): void {
  }
  profileForm = new FormGroup({
    login: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    fname: new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
  });

  onSubmit() {
    var login = this.profileForm.value.login;
    var password = this.profileForm.value.password;
    var fname = this.profileForm.value.fname;
    var lname = this.profileForm.value.lname;

    var formData: any = new FormData();
    formData.append("name",fname+" "+lname);
    formData.append("email", login);
    formData.append("password", password);

    const data = {};
    // @ts-ignore
    formData.forEach((value :any, key:any) => (data[key] = value));

    this.service.register(data).subscribe(data => {
      let res = JSON.stringify(data);
      let result = JSON.parse(res)['status'];
      if (result === "success"){
        this.router.navigateByUrl('login');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = "";
  constructor(private router: Router, private  service: ConnectionService) {

  }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    login: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  onSubmit() {
    var login = this.profileForm.value.login;
    var password = this.profileForm.value.password;

    var formData: any = new FormData();
    formData.append("email", login);
    formData.append("password", password);

    this.service.connect(formData);

    if (login === "abbes"){
      this.router.navigateByUrl('products');
    }else{
      this.error = "login or password not correct";
    }
  }
}

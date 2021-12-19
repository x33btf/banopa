import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ConnectionService} from "../services/connection.service";
import {AppComponent} from "../app.component";

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
    if(this.service.loggediIn()){
      this.router.navigateByUrl('products');
    }
  }

  profileForm = new FormGroup({
    login: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  onSubmit() {
    var login = this.profileForm.value.login;
    var password = this.profileForm.value.password;

    var fData: any = new FormData();
    fData.append("name","sadik fezfef");
    fData.append("email", login);
    fData.append("password", password);

    const data = {};
    // @ts-ignore
    fData.forEach((value :any, key:any) => (data[key] = value));
    let status = "";
    this.service.connect(data).subscribe(data => {
      let res = JSON.stringify(data);
      let result = JSON.parse(res);
      console.log(result);
      if (result['status'] === "success"){
        console.log(result['res']);
        localStorage.setItem('user_id', result['res']['_id']);
        localStorage.setItem('user_name', result['res']['name']);
        localStorage.setItem('user_mail', result['res']['email']);
        localStorage.setItem('token', result['res']['tokens']['access']);
        localStorage.setItem('token_ref', result['res']['tokens']['refresh']);
        this.router.navigateByUrl('products');
      }
    });


  }

}

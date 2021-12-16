import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

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

  }
}

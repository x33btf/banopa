import { Component, OnInit } from '@angular/core';
import {ConnectionService} from "../services/connection.service";
import {Router} from "@angular/router";
import {User} from "../model/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private hRegister:boolean=false;
   user: User;
  constructor( private  service: ConnectionService, private  router: Router) {
      this.user = {
        user_mail : localStorage.getItem("user_mail") || "",
        user_id : localStorage.getItem(("user_id")) || "" ,
        user_name :localStorage.getItem("user_name") || "",
        user_token : localStorage.getItem("token") || "",
        user_token_ref : localStorage.getItem("token_ref") || "",
        user_password :  ""
      }
  }

  ngOnInit(): void {
  }
  userForm = new FormGroup({
    user_name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required)
  });

  logout() {
    this.service.logOut();
    this.router.navigateByUrl('login');
  }

  hideRegister() {
    this.hRegister = true;
  }
  showRegister() {
    this.hRegister = false;
  }

  updateUser(){

  }
}

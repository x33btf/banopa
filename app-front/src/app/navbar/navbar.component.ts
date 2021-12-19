import { Component, OnInit } from '@angular/core';
import {ConnectionService} from "../services/connection.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private hRegister:boolean=false;
  constructor( private  service: ConnectionService, private  router: Router) { }

  ngOnInit(): void {
  }

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
}

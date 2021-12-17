import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";



@Injectable({providedIn:"root"})
export class ConnectionService{
  constructor(private http:HttpClient) {
  }

  connect(formData:any){
    let host = environment.host+"/login";

    return this.http.post(host, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  register(formData:any){
    let host = environment.host+"/register";

    return this.http.post(host, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

}

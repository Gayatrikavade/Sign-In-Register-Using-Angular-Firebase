import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string='';
  password:string='';

  constructor(private auth:AuthService){}

  ngOnInit():void{

  }

  login(){
    if(this.email==''){
      alert('please enter the email');
      return;
    }
    if(this.password==''){
      alert('please enter the password');
      return;
    }
    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }

}

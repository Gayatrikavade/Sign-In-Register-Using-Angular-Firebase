import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  email:string='';

  constructor(private authSerive:AuthService){

  }
  forgetPassword(){
    this.authSerive.forgetPassword(this.email);
    this.email='';
  }
}

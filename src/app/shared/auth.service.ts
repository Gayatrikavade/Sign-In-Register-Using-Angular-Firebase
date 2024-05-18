import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import {GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth ,private router:Router) { }

  login(email:string ,password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then((res)=>{
      localStorage.setItem('token','true');
      

      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['/verify-email']);
      }
    },
    err=>{
      alert('something went wrong');
      this.router.navigate(['/login']);
    }
    )
  }

  register(email:string,password:string){
    this.fireAuth.createUserWithEmailAndPassword(email,password).then(res=>{
      alert('Registered successfully');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
      
    },
    err=>{
      alert(err.message);
      this.router.navigate(['/register']);
    }
    )
  }

  logOut(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

    },
    err=>{
      alert(err.message);
    })
  }

  forgetPassword(email:string){
    this.fireAuth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-email']);
    },
    err=>{
      alert('Something went wrong!');
    })
  }

  // sendEmailForVerification(user:any){
  //   user.sendEmailForVerification().then((res:any)=>{
  //     this.router.navigate(['/verify-email']);
  //   },
  //  (err:any)=>{
  //   alert('Something went wrong');
  //   })
  // }

  sendEmailForVerification(user: any){

    this.fireAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verify-email']);
      }, (err: any) =>{
          alert('Something Went Wrong. Not able to send mail to registered Email.');
      })

  }

  googleSignIn(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },
    err=>{
      alert(err.message);
    })
  }
}

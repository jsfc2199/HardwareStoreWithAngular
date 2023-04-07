import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private angularAuth: AngularFireAuth) { }

  registerUser(userName: string, email:string, password: string){
    this.angularAuth.createUserWithEmailAndPassword(email,password)
      .then(response => {
        //this saves the authentication but i am not going to store this user because is not the porpuse of this exercise
        //this is just to make sure that the user is being created
        const user = response.user
        console.log(user);
      })
  }

  login(){

  }
}

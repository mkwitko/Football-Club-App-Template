import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFireAuth
  ) { }

  login(user: Usuario){
    return this.afs.signInWithEmailAndPassword(user.user.trim(), user.password.trim());
  }

  loginGuest(){
    return this.afs.signInAnonymously();
  }

  logout(){
    return this.afs.signOut();
  }

  getAuth(){
    return this.afs;
  }

  register(user: Usuario) {
    return this.afs.createUserWithEmailAndPassword(user.user.trim(), user.password.trim());
  }

  resetPassword(email: string){
    return this.afs.sendPasswordResetEmail(email.trim());
  }
}

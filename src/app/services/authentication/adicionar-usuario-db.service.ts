import { Usuario } from 'src/app/interfaces/usuario';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdicionarUsuarioDbService {

  public colecao: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore) {
    this.colecao = this.afs.collection<Usuario>('Usuarios');
   }

   getClientes(){
    return this.colecao.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        }))
    );
  }

  get(id: string){
    return this.colecao.doc<Usuario>(id).valueChanges();
  }

  addCliente(cliente: Usuario, uid: string){
    return this.colecao.doc(uid).set({
      user: cliente.user,
      nome: cliente.nome,
      id: uid,
      createdAt: cliente.createdAt,
      who: cliente.who
    });
  }

  deleteCliente(id: string){
    return this.colecao.doc(id).delete();
  }

  update(x: Usuario, id: string){
    return this.colecao.doc<Usuario>(id).update(x);
  }
}

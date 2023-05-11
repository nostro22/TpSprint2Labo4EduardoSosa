import { Injectable } from '@angular/core';
import { CollectionReference, docSnapshots, onSnapshot, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import { Pelicula } from '../clases/pelicula';
import { Data } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail  } from "firebase/auth";
import { BehaviorSubject, Observable, Subject, from, map } from 'rxjs';
import { signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  col: CollectionReference;
  colUsuarios: CollectionReference;
  docUsuarios: DocumentReference;
  doc: any;
  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'peliculas');
    this.colUsuarios = collection(this.firestore, 'usuarios');
    this.doc = doc(this.firestore, 'peliculas', '1');
    this.docUsuarios = doc(this.firestore, 'usuarios', '1');
  }

  traer() {
    const obsevable = collectionData(this.col);
    obsevable.subscribe((respuesta) => {
      console.log(respuesta);
    });
  }

  borrar(nombreDocumento: string, idDocumento: string) {
    const documento = doc(this.firestore, nombreDocumento, idDocumento);
    deleteDoc(documento);
  }

  // altaPelicula(pelicula: Data) {
  //   addDoc(this.col, pelicula).then((docRef: any) => {
  //     const docId = docRef.id;
  //     const docToUpdate = doc(this.firestore, 'peliculas/' + docId);
  //     updateDoc(docToUpdate, { id: docId })
  //       .then(() => console.log("Document written with ID: ", docId))
  //       .catch((error: any) => console.error("Error updating document: ", error));
  //   })
  //   .catch((error: any) => {
  //     console.error("Error adding document: ", error);
  //   });
  // }

  altaPelicula(pelicula: Pelicula) {
    const col = collection(this.firestore, 'peliculas');
    const peliculaObj = pelicula.toFirestoreObject(); // convert to plain JS object
    return addDoc(col, peliculaObj).then((docRef) => {
      const newId = docRef.id;
      pelicula.setId(newId); // set the ID of the Pelicula object to the new ID
      updateDoc(docRef, pelicula.toFirestoreObject());
      console.log('Document added with ID:', newId);
    }).catch((error) => {
      console.error('Error adding document:', error);
    });
  }

  altaUsuario(usuario: Usuario, email: string, password: string) {
    const auth = getAuth();
    const usuarioObj = usuario.toFirestoreObject();

    return addDoc(this.colUsuarios, usuarioObj)
      .then((docRef) => {
        const newId = docRef.id;
        usuario.setId(newId);
        updateDoc(docRef, usuario.toFirestoreObject());
        console.log('Document added with ID:', newId);

        // Create new Firebase Authentication user
        return createUserWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });
  }
  private tokenSubject = new BehaviorSubject<string>('');

  get token$(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
async signIn(email: string, password: string): Promise<any> {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = userCredential.user?.uid || '';
  localStorage.setItem('token', token); // save token to localStorage
  this.tokenSubject.next(token);
  return userCredential;
}

  
  async cerrarSeccion(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
    this.tokenSubject.next('');
  }
  async checkIfUserExists(email: string): Promise<boolean> {
    try {
      const auth = getAuth();
      const methods = await fetchSignInMethodsForEmail(auth,email);
      return methods.length > 0;
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  }
  
  getUserData(): any {
 
  }
  

}
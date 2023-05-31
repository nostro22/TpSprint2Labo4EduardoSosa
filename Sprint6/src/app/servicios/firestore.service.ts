import { Injectable } from '@angular/core';
import { CollectionReference, docSnapshots, onSnapshot, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, updateDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Data, Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { BehaviorSubject, Observable, Subject, from, map } from 'rxjs';
import { signOut } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { left } from '@popperjs/core';
import { DocumentData, Query, limit } from 'firebase/firestore';
import { Encuesta } from '../clases/encuesta';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public startTime: number;
  public timerId!: any;
  public elapsedTime = 0;
  public playing = true;
  colUsuarios: CollectionReference;
  docUsuarios: DocumentReference;
  doc: any;
  public usuarioAutenticado: any;

  constructor(private firestore: Firestore, private router: Router, private toastCtrl: ToastrService) {
    this.colUsuarios = collection(this.firestore, 'usuarios');
    this.docUsuarios = doc(this.firestore, 'usuarios', '1');
    this.startTime = 0;
  }
  private elapsedTimeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  getElapsedTime(): Observable<number> {
    return this.elapsedTimeSubject.asObservable();
  }
  async showAlertSucces(titulo:string,mensaje:string): Promise<void> {
    // You can customize the title, text, and other options here
    const result = await Swal.fire({
      title: titulo,
      text: mensaje,
      background: 'rgba(6, 214, 160, 0.8)',
      color:'white',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.giphy.com/media/2A760H1p8R9UNpYCba/giphy.gif")
        top center
        no-repeat
      `,
      //icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Continuar',
     // cancelButtonText: 'No, keep it.',
    });
  
    if (result.isConfirmed) {
      // Perform the action when the user clicks "Yes, delete it!"
    } else {
      // Perform the action when the user clicks "No, keep it!"
    }
  }
  async showAlertDanger(titulo:string,mensaje:string): Promise<void> {
    // You can customize the title, text, and other options here
    const result = await Swal.fire({
      title: titulo,
      text: mensaje,
      color:'white',
      background: 'rgba(247, 37, 133, 0.4)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.giphy.com/media/QQ1K0jv4JyUR750vrr/giphy.gif")
        top center
        no-repeat
      `,
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Continuar',
     // cancelButtonText: 'No, keep it.',
    });
  
    if (result.isConfirmed) {
      // Perform the action when the user clicks "Yes, delete it!"
    } else {
      // Perform the action when the user clicks "No, keep it!"
    }
  }
  




  async uploadScore(tiempo: string, usuarioMail: string, juego: string) {
    try {
      const user = this.usuarioAutenticado;
      if (!user) {
        throw new Error('Usuario no ingreso');
      }
      const photoRefCollection = collection(this.firestore, 'tiempos');
      let nombreobtenido = usuarioMail.split('@')[0];
      const score = {
        nombre: nombreobtenido,
        usuario: usuarioMail,
        tiempo: tiempo,
        juego: juego,
      };

      await addDoc(photoRefCollection, score);
    } catch (error) {
      console.log('Error subiendo el puntaje ', error);
      throw error;
    }
  }

  ///// Ahorcado

  async getResultadosAhorcado(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'ahorcado');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
  
    const querySnapshot = await getDocs(usuariosRefCollection);
    if (!querySnapshot.empty) {
      const encuestas = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      const distinctUsers = this.getDistinctUsers(encuestas);
      return distinctUsers;
    }
  
    // If no records are found, you can return a default value or throw an exception, depending on your needs.
    return [];
  }
  
  getDistinctUsers(encuestas: any[]): any[] {
    const distinctUsers: any[] = [];
    const userCountMap = new Map();
  
    // Count users and add distinct users to the list
    for (const encuesta of encuestas) {
      const usuario = encuesta.usuario;
      // Check if the user is already added to the distinctUsers list
      if (!userCountMap.has(usuario)) {
        userCountMap.set(usuario, 1);
        distinctUsers.push(encuesta);
      } else {
        const count = userCountMap.get(usuario) + 1;
        userCountMap.set(usuario, count);
      }
    }
  
    // Update the 'cantidasAdivinadas' property with the user count
    for (const encuesta of distinctUsers) {
      const usuario = encuesta.usuario;
      const count = userCountMap.get(usuario);
      encuesta.cantidasAdivinadas = count;
    }
  
    // Sort distinctUsers by 'cantidasAdivinadas' in descending order
    distinctUsers.sort((a, b) => b.cantidasAdivinadas - a.cantidasAdivinadas);
    return distinctUsers;
  }
  
  

  async uploadScoreAhorcado(palabra: string) {
    try {
      await this.usuarioEstaAutenticado();
      const user = this.usuarioAutenticado;
      if (!user) {
        throw new Error('Usuario no ingreso');
      }
      const photoRefCollection = collection(this.firestore, 'ahorcado');
      let nombreobtenido = user.email.split('@')[0];
      const score = {
        nombre: nombreobtenido,
        usuario: user.email,
        palabra: palabra,
        fecha: new Date().toLocaleString('es-AR'),
      };

      await addDoc(photoRefCollection, score);
    } catch (error) {
      console.log('Error subiendo el puntaje ', error);
      throw error;
    }
  }

  async getPalabrasAdivinadas(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'ahorcado');
    // Check if usuarioAutenticado.email is defined
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(usuariosRefCollection, where('usuario', '==', this.usuarioAutenticado['email']));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.size;
    }


    return null;
  }



  /////Mayor menor 

  async getResultadosMayorMenor(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'mayorMenor');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      orderBy('aciertos', 'desc'),
    );
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const encuestas = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      return encuestas;
    }
    // If no records are found, you can return a default value or throw an exception, depending on your needs.
    return [];
  }
  
  async uploadScoreMayorMenor(aciertos: number) {
    try {
      this.usuarioAutenticado = await this.usuarioEstaAutenticado();
      const photoRefCollection = collection(this.firestore, 'mayorMenor');
      let nombreobtenido = this.usuarioAutenticado.email.split('@')[0];
      const score = {
        nombre: nombreobtenido,
        usuario: this.usuarioAutenticado.email,
        aciertos: aciertos,
        fecha: new Date().toLocaleString('es-AR')
      };

      await addDoc(photoRefCollection, score);
    } catch (error) {
      console.log('Error subiendo el puntaje ', error);
      throw error;
    }
  }


  async getMayorAciertos(): Promise<number> {
    const usuariosRefCollection = collection(this.firestore, 'mayorMenor');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      where('usuario', '==', this.usuarioAutenticado.email),
      orderBy('aciertos', 'desc')
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const mayorAciertos = docSnapshot.data()['aciertos'];
      if (!isNaN(mayorAciertos)) {
        return mayorAciertos;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  ///////// Preguntados

  async getResultadosPreguntados(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'preguntados');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      orderBy('aciertos', 'desc'),
    );
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const encuestas = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      return encuestas;
    }
    // If no records are found, you can return a default value or throw an exception, depending on your needs.
    return [];
  }
  
  async uploadScorePreguntados(aciertos: number, tiempo: any) {
    try {
      this.usuarioAutenticado = await this.usuarioEstaAutenticado();
      const photoRefCollection = collection(this.firestore, 'preguntados');
      let nombreobtenido = this.usuarioAutenticado.email.split('@')[0];
      const score = {
        nombre: nombreobtenido,
        usuario: this.usuarioAutenticado.email,
        aciertos: aciertos,
        tiempo: tiempo,
        fecha: new Date().toLocaleString('es-AR')
      };

      await addDoc(photoRefCollection, score);
    } catch (error) {
      console.log('Error subiendo el puntaje ', error);
      throw error;
    }
  }

  async getPersonalBestPreguntados(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'preguntados');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      where('usuario', '==', this.usuarioAutenticado.email),
      orderBy('aciertos', 'desc'),
      orderBy('tiempo', 'asc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      return docSnapshot.data();
    }
    // Si no se encuentra ningún registro, puedes retornar un valor predeterminado o lanzar una excepción, según tus necesidades.
    return "";
  }

  /////////Juego Propio
  async uploadScoreAsteroides(aciertos: number) {
    try {
      this.usuarioAutenticado = await this.usuarioEstaAutenticado();
      const photoRefCollection = collection(this.firestore, 'asteroides');
      let nombreobtenido = this.usuarioAutenticado.email.split('@')[0];
      const score = {
        nombre: nombreobtenido,
        usuario: this.usuarioAutenticado.email,
        aciertos: aciertos,
        fecha: new Date().toLocaleString('es-AR')
      };

      await addDoc(photoRefCollection, score);
    } catch (error) {
      console.log('Error subiendo el puntaje ', error);
      throw error;
    }
  }

  async getPersonalBestAsteroides(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'asteroides');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      where('usuario', '==', this.usuarioAutenticado.email),
      orderBy('aciertos', 'desc'),
      orderBy('fecha', 'asc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      return docSnapshot.data();
    }
    // Si no se encuentra ningún registro, puedes retornar un valor predeterminado o lanzar una excepción, según tus necesidades.
    return "";
  }

  async getResultadosAsteroides(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'asteroides');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      orderBy('aciertos', 'desc'),
    );
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const encuestas = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      return encuestas;
    }
    // If no records are found, you can return a default value or throw an exception, depending on your needs.
    return [];
  }
  

  /////////Encuestas
  async uploadEncuesta(encuesta: Encuesta) {
    try {
      this.usuarioAutenticado = await this.usuarioEstaAutenticado();
      const photoRefCollection = collection(this.firestore, 'encuestas');
      let encuestaFire = encuesta.toFirestoreObject();
      await addDoc(photoRefCollection, encuestaFire);
    } catch (error) {
      console.log('Error subiendo encuesta ', error);
      throw error;
    }
  }

  async getEncuestas(): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'encuestas');
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    const q = query(
      usuariosRefCollection,
      orderBy('fecha', 'asc'),
    );
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const encuestas = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      return encuestas;
    }
    // If no records are found, you can return a default value or throw an exception, depending on your needs.
    return [];
  }
  
  

  //// Registro Usuario

  borrar(nombreDocumento: string, idDocumento: string) {
    const documento = doc(this.firestore, nombreDocumento, idDocumento);
    deleteDoc(documento);
  }


  async altaUsuario(usuario: Usuario, email: string, password: string) {
    try {
      const auth = getAuth();
      const usuarioObj = usuario.toFirestoreObject();

      const usuarioNuevo = await createUserWithEmailAndPassword(auth, email, password);
      const newId = usuarioNuevo.user?.uid;
      if (!newId) {
        throw new Error("Token no encontrado");
      }

      const docRef = await addDoc(this.colUsuarios, usuarioObj);
      usuario.setId(newId);
      await updateDoc(docRef, usuario.toFirestoreObject());
      //console.log('Document added with ID:', newId);

      // Continue with other tasks if necessary

    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  private tokenSubject = new BehaviorSubject<string>('');

  get token$(): Observable<string> {
    return this.tokenSubject.asObservable();
  }
  async signIn(email: string, password: string): Promise<any> {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = userCredential.user?.uid || '';
    this.usuarioAutenticado = userCredential.user;
    localStorage.setItem('token', token); // save token to localStorage
    this.tokenSubject.next(token);
    return userCredential;
  }

  usuarioEstaAutenticado() {
    const token = localStorage.getItem('token');
    if (!token) {
     return "";
    }
    return this.getUserByUID(token);
  }

  async getUserByUID(uid: string): Promise<any> {
    const usuariosRefCollection = collection(this.firestore, 'usuarios');
    const q = query(usuariosRefCollection, where('_id', '==', uid));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const user = {
        uid: docSnapshot.data()['_id'],
        email: docSnapshot.data()['email'],
        nombre: docSnapshot.data()['nombre']
        // Add other fields as needed
      };
      this.usuarioAutenticado = user;
      // console.log(user);
      return user;
    }
    return null;
  }

  async cerrarSeccion(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
    this.tokenSubject.next('');
  }
  async checkIfUserExists(email: string): Promise<boolean> {
    try {
      const auth = getAuth();
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error('Error verificando si el usuario existe:', error);
      return false;
    }
  }

  ///Registro logins

  async subirHistorialLogin(usuarioMail: string) {
    try {
      const loginRef = collection(this.firestore, 'historialLogins');
      const historial = {
        usuario: usuarioMail,
        fecha: new Date().toLocaleString('es-AR')
      };
      await addDoc(loginRef, historial);
    }

    catch (error) {
      console.log("Error subiendo historial.", error);
      throw error;
    }
    finally {
    }
  }

  ////Chat

  async getMensajesRefs(): Promise<any[]> {
    const mensajesRefCollection = collection(this.firestore, 'mensajes');
    const querySnapshot = await getDocs(mensajesRefCollection);
    const mensajesRefs: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      mensajesRefs.push(data);
    });
    return mensajesRefs;
  }

  async uploadMensaje(mensaje: string) {
    try {

      const mensajeRefCollection = collection(this.firestore, 'mensajes');

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const usuario = await this.getUserByUID(token);
      console.log(usuario);

      const mensajeObj = {
        escritoPor: usuario.email,
        mensaje: mensaje,
        fecha: new Date().toLocaleString('es-AR'),
      };

      await addDoc(mensajeRefCollection, mensajeObj);
    } catch (error) {
      console.log("Error subiendo mensaje:", error);
      throw error;
    }
  }

  ////////    Toast notifications

  async toastNotificationWarning(mensaje: string) {
    const toast = await this.toastCtrl.warning("", mensaje, {
      timeOut: 3000,
    });
  }
  async toastNotificationInfo(mensaje: string) {
    const toast = await this.toastCtrl.info("", mensaje, {
      timeOut: 3000,
    });
  }
  async toastNotificationSuccess(mensaje: string) {
    const toast = await this.toastCtrl.success("", mensaje, {
      timeOut: 3000,
    });
  }
  async toastNotificationError(mensaje: string) {
    const toast = await this.toastCtrl.error("", mensaje, {
      timeOut: 3000,
    });
  }

  async esAdministrador(): Promise<boolean> {
    this.usuarioAutenticado = await this.usuarioEstaAutenticado();
    if(this.usuarioAutenticado)
    {

      const collectionRef = collection(this.firestore, 'usuarios');
      const queryRef: Query<DocumentData> = query(collectionRef, where('tipo', '==', 'administrador'), where('email', '==', this.usuarioAutenticado?.email));
      const snapshot = await getDocs(queryRef);
      if (snapshot.empty) {
        return false;
      } else {
        return true;
      }
    }
    else{
      return false;
    }
  }

  async esUsuario(): Promise<boolean> {
    if (await getAuth().currentUser || localStorage.getItem("token") != "") {
      return true;
    }
    else {
      return false;
    }
  }

}
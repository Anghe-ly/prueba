import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;
  private logueadoSubject = new BehaviorSubject<boolean>(!!this.getToken());

  logueado$ = this.logueadoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



login(username: string, password: string): Observable<{token: string}> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/login/auth`, { username, password })
    .pipe(
      tap((response: { token: string }) => {
        
        sessionStorage.setItem('token', response.token);
        this.logueadoSubject.next(true);
      })
    );
}

//metodo de Logout que elimina el token y luego te lleva al login de nuevo
logout(): void{
  sessionStorage.removeItem('token');
  this.logueadoSubject.next(false);
  this.router.navigate(['/inicio-sesion']);
}

//metodo que añade el token al sessionStorage
setToken(token: string):void{
 sessionStorage.setItem('token', token);
}


//metodo que obtiene el token almacendo en el sessionStorage
getToken(): string | null {
  return sessionStorage.getItem('token');
}


//metodo que verifica si hay un token osea si el usuario esta logueado
logueado():boolean{
  if(this.getToken()){
    return true;

  }else{
    return false;
  }
}


 //metodo que decodifica el payLoad del token
  private decodePayload(): any | null {
    let token = this.getToken();

    if(!token){
      return null;
    }else{
      try{
      token = token.replace(/^Bearer\s+/i, '');

      const payload = token.split('.')[1];

      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

      const pad = base64.length % 4;

      const padBase64 =  pad ? base64 + '='.repeat(4 - pad) : base64;

      const json = atob(padBase64);

      return JSON.parse(json);

      }catch (error) {
        console.error('Error al decodificar el payload', error);
        return null;
      }
    }
  }

  //metodo que usa el decod para extraer el rol del usuario
getRole(): string | null {
  const payload = this.decodePayload();
  if(!payload){
    return null;

  }
  return payload.rol || null;
}


isAdmin():boolean{
  const role = this.getRole();
  if(role === 'ADMIN' || role === 'ROLE_ADMIN' || role === 'admin' || role === 'ROLE_ADMIN'){
    return true;
}else{
  return false;
}
}


  //metodo que usa el decodificador para obtener el id del usuario
  getUsuarioId(): number | null {

    const payload = this.decodePayload();
    if (!payload){
      return null;
    }else{
      const idUsuario = payload.idUsuario ?? payload.userId ??  payload.sub ?? null;
      if(typeof idUsuario === 'number'){
        return idUsuario;
      }else if (typeof idUsuario === 'string'){
        return Number(idUsuario);
    }

  }
    return null;
}

  }//fin del authService

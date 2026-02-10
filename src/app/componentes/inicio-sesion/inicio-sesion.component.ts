import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit {


//variables

mostrarRegistro: boolean = false;
toastVisible: boolean = false;
toastMensaje: string = "";
toastClase: string = 'bg-success';

user: Usuario = {
  user: "",
  correo: "", 
  password: "",
  avatar: ""
 }

formularioRegistro:FormGroup = new FormGroup({
  user: new FormControl(""),
  correo: new FormControl(""),
  pass: new FormControl("")
});

formularioLogin:FormGroup = new FormGroup({
  correo: new FormControl(""),
  pass: new FormControl("")
})


//constructor
 constructor(
  private servicio: UsuarioService, 
  private auth: AuthService,
  private router: Router, 
  private formBuilder: FormBuilder
 ){

 }




 ngOnInit(): void {
   //creacion de usuario y subirlo a la BBDD 

   //VALIDACION DE LOS FORMULARIOS
  this.formularioRegistro = this.formBuilder.group({
    user: ["", Validators.required],
    correo: ["", [Validators.required, Validators.email]],
    pass: ["", [Validators.required, Validators.minLength(6)]]
  })

  this.formularioLogin = this.formBuilder.group({
    user: ["", Validators.required],
    pass: ["", [Validators.required, Validators.minLength(6)]]
  })

 }


onSubmitLogin() {
  if(this.formularioLogin.valid) {
    
    this.user.user = this.formularioLogin.value.user;
    this.user.password = this.formularioLogin.value.pass;

    this.auth.login(this.user.user, this.user.password).subscribe({

      next: () => {
        this.mostrarToast("Inicio de sesión exitoso", "success");

         setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },
      error: () => {
        this.mostrarToast("Credenciales erróneas", "danger")
      }
    }
    )
  }
}
 

onSubmitRegistro(){
  
  if(this.formularioRegistro.valid){
    
    this.user.user = this.formularioRegistro.value.user
    this.user.correo = this.formularioRegistro.value.correo
    this.user.password = this.formularioRegistro.value.pass

    this.servicio.anadirUser(this.user).subscribe({
      next: ()=> {
       
        this.mostrarToast("Usuario creado con éxito", "success")
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },
      error: ()=>{
              this.mostrarToast("No se ha podido crear el usuario", "danger")

      }
     
      
    }) //fin del suscribe

  } //fin del if
 }


cambiarForm(){
  this.mostrarRegistro = !this.mostrarRegistro

 }
 

 mostrarToast(mensaje:string, tipo: 'success' | 'danger'){
  this.toastMensaje = mensaje;
  this.toastClase = `bg-${tipo}`;
  this.toastVisible = true;

  setTimeout(() => {
    this.toastVisible = false;
  }, 2000);
 }

}

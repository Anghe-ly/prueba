import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit {
//variables

mostrarRegistro: boolean = false;
logeado: boolean = false;
alerta: boolean = false;

user: Usuario = {
  idUsuario: 0,
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

      next: (datos) => {
        console.log("Inicio de sesión exitoso");
        this.logeado = true;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error("Error al iniciar sesión", error);
        this.mostrarAlerta();
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
      next: (datos)=> {
        console.log("Usuario creado con exito")
      },
      error: (error)=> {
        console.log(error)
      }
    }) //fin del suscribe

  } //fin del if
 }

cambiarForm(){
  this.mostrarRegistro = !this.mostrarRegistro

 }
 

 //arreglar alert mas tarde
 
 
mostrarAlerta(){
  this.alerta = true;

  setTimeout(() => {
    this.alerta = false;
  }, 3000);
  }
}

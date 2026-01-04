import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  alerta: boolean = false

  nuevoUser: Usuario = {
    user: "",
    correo: "", 
    password: "",
    avatar: ""
  }

  constructor(
    private router: Router,    
    private servicio: UsuarioService,
    private authServicio: AuthService
  ){}


  validarFormulario: FormGroup = new FormGroup({
  
    user: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),

    correo: new FormControl("", [
      Validators.required,
      Validators.email
    ]), 

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  })


  onSubmit(){

    if(this.validarFormulario.valid){

      this.nuevoUser.correo = this.validarFormulario.value.correo
      this.nuevoUser.user = this.validarFormulario.value.user
      this.nuevoUser.password = this.validarFormulario.value.password

      this.servicio.anadirUser(this.nuevoUser).subscribe({
        next: (res: any)=> {
          this.mostrarAlerta()
             //se loguea luego de crearse el user
      
             if(res && res.token){
              this.authServicio.setToken(res.token);
             }
             this.router.navigate(['/lista']);
        }
      })

         

    }
  }


mostrarAlerta(){
  this.alerta = true 

setTimeout(() => {
    this.alerta = false
  }, 3000);
}

}

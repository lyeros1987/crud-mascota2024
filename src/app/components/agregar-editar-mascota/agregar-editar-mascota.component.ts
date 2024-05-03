import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TrendingUpSharp } from '@material-ui/icons';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css'],
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });
//OBTENMOS EL ID
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }
  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe((data) => {
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso,
      });
      this.loading = false;
    });
  }
  //metedo para agregar y editar a la vez
  agregarEditarMascota() {
    // const nombre = this.form.get('nombre).value;
    //Armamos el objeto

    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
    } 
    if (this.id != 0) {
      mascota.id =this.id //variable global
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }

    //Envamo Ob el bakc
  }
  editarMascota(id : number, mascota: Mascota){
    this.loading = true;
   this._mascotaService.updateMascota(id, mascota).subscribe(()=>{
    this.loading = false;
    console.log("llegue")
    this.mensajeExito('actualizada');
    this.router.navigate(['/listMascotas']);
    
   })
  }

  agregarMascota(mascota: Mascota) {
    this._mascotaService.addMascota(mascota).subscribe((data) => {
      this.mensajeExito('registrada');
      this.router.navigate(['/listMascotas']);
    });
  }
  mensajeExito(text : string) {
    this._snackBar.open(`La Mascota fue ${text} con exito`, '', {
      duration: 2000,
      horizontalPosition: 'right',
    });
  }
}

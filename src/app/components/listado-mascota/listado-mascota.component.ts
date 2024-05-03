import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota';
//

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from 'src/app/services/mascota.service';

// const listMascotas: Mascota[] = [
//   { nombre: 'Ciro', edad: 3, raza: 'Golden', color: 'Dorado', peso: 8 },
//   { nombre: 'Julio', edad: 4, raza: 'Dalmata', color: 'Negro', peso: 2 },
//   { nombre: 'Caligula', edad: 5, raza: 'Pekines', color: 'Blanco', peso: 6 },
//   { nombre: 'Cesar', edad: 6, raza: 'Pastor', color: 'Amarillo', peso: 5 },
//   { nombre: 'Davi', edad: 8, raza: 'Bouldog', color: 'Azul', peso: 4 },
// ];
@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css'],
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'edad',
    'raza',
    'color',
    'peso',
    'acciones',
  ];
  // dataSource = new MatTableDataSource<Mascota>(listMascotas);
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'ele x paginas';
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  obtenerMascotas(){
    this.loading = true;
    this._mascotaService.getMascotas().subscribe(data =>{
      this.loading = false;
      this.dataSource.data = data;

    },error =>{this.loading = false,
      alert('Ocurrio un error')
    })

    }

  // obtenerMascotas() {
  //   this.loading = true;
  //   this._mascotaService.getMascotas().subscribe({
  //     next: (data) => {
  //       this.loading = false;
  //       this.dataSource.data = data;
  //     },
  //     error: (e) => (this.loading = false),
  //     complete: () => console.info('complete')
      
  //   });
  // }

  eliminarMascota(id: number) {
    this.loading = true;  //muestra el loadin cargando
    this._mascotaService.deleteMascota(id).subscribe(()=>{
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    })



  }
  mensajeExito(){
    this._snackBar.open('La mascota fue borrada', '', {
      duration: 2000,
      horizontalPosition: 'right',
    });
  }
}

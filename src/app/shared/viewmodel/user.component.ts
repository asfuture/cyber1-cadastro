import { UserService } from './../service/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: '../views/user/user.component.html',
  styleUrl: '../views/user/user.component.css'
})

export class UserComponent implements OnInit, OnDestroy {
  user:Usuario[]  = [];
  
  private unsubscribe$ = new Subject<void>();

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.getUsuarios();
  }

//Requisição de todos os usuários
getUsuarios() {
  this.userService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.user = response || [] ;
          //console.log("dados  ",this.user )
        },
        error: (error) => {
          console.error('Erro ao obter estados:', error);
        }
      });
  }
  
  // Obter id para editar cadastro
  editar(id:number) {
    this.userService.usuarioId(id)
  }

  //Deletar usuário
  deletar(id:number){
    if(id){
    const confirma = window.confirm(" Vocé realmente deseja deletar este item?");

    // Confirmação do usuário para deletar o cadastro.
    if(confirma){
        this.userService.deleteUser(id).pipe(
          takeUntil(this.unsubscribe$))
          .subscribe({
            next: (response:Usuario[]) => {
                this.getUsuarios();
            }, 
            error:(error) => {
            console.log('Erro ao fazer requisição dos cards',error, )
            }
        });
      }
    } 
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

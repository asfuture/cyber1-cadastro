import { UserService } from './../service/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: '../views/form/form.component.html',
  styleUrl: '../views/form/form.component.css'
})
export class FormComponent implements OnInit, OnDestroy {
  form!:FormGroup;
  titulo:string = 'Cadastrar Usuário';
  openModal:boolean = false;
  valor:number = 0
  private unsubscribe = new Subject<void>();

  constructor( 
      private fb: FormBuilder,
      private userService:UserService,
  ){}

  ngOnInit(): void {
    this.validacaoFormulario()
    this.obterIdUsuario();
  }

   //Validação do form
   validacaoFormulario() {
    this.form = this.fb.group({
      nome: ['', [Validators.required,Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email ]],
      telefone: ['', [Validators.required, Validators.maxLength(11)]],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  
//Obter o ID enviado pelo componente user e acionar o modal
obterIdUsuario() {
  this.userService.idUsuário$.subscribe(id => {
    this.valor = id
    if(this.valor != 0){
      this.carregarDadosForm(id);
      this.openModal = true;
    }
  })
}

//Cadastrar usuário
  onSubmit() {
      if(this.form.valid) {
        const data = this.form.value;
           this.userService.createUser(data ).pipe(
            takeUntil(this.unsubscribe))
            .subscribe({
             next: (response) => {
               console.log(" Usuário cadastrado com sucesso!",response)
               alert("Cadastro realizado com sucesso!")
               window.location.reload();
             }, 
              error:(error) => {
              console.log('Erro ao fazer requisição dos cards',error, )
              }
            });
           this.form.reset();
      }
  }

  //Atualizar cadastro do usuário
  onSubmitUpdate() {
    if(this.form.valid) {
      const data = this.form.value;
      const id = this.valor;
          this.userService.updateUser(id, data ).pipe(
           takeUntil(this.unsubscribe))
           .subscribe({
            next: (response) => {
              alert("Cadastro atualizado com sucesso!");
              window.location.reload();
            }, 
             error:(error) => {
             console.log('Erro ao fazer requisição dos cards',error, )
             }
           });
          this.close();
      }
  }

  //Enviar dados para o form para ser editado.
  carregarDadosForm(id: number): void {
    this.titulo = 'Atualizar Cadastro';
    this.userService.getUser(id).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(
      (dados: any) => {
        //console.log("carregar dados" , dados)
        this.form.patchValue({
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          endereco: dados.endereco,
        });
      },
      (erro) => {
        console.error('Erro ao carregar dados:', erro);
      }
    );
  }

  //Fechar modal e atualizar titulo do formulário
  close() {
    this.openModal = false;
    this.form.reset();
    this.titulo = 'Cadastrar Usuário';
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

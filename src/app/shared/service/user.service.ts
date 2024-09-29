import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../model/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  private messageSubject = new BehaviorSubject<string | null >(null);
  message$ = this.messageSubject.asObservable();

  showMessage(message:string){
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(null),3000)
  }

  private idUsuario = new BehaviorSubject<number>(0)
  idUsuário$ = this.idUsuario.asObservable();
  
  usuarioId(id:number){
    this.idUsuario.next(id);
  }

 
 
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      tap(() => this.showMessage("Lista de dados obtida com sucesso!")),
      catchError(error => {
        this.showMessage(`Erro ao obter lista de dados: ${error.message || error}`);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }


  getUser(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.showMessage("Dados obtidos com sucesso!")),
      catchError(error => {
        this.showMessage(`Erro ao obter Dados: ${error.message || error}`);
        return of([]); // Retorna um array vazio em caso de erro
      })
  );
}

  createUser(user: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.apiUrl, user).pipe(
      tap(() => {this.showMessage('Usuário cadastrado com sucesso');}),
      catchError((error) => {
        this.showMessage(`Erro ao enviar dados do usuário: ${error.message || error}`);
        return of(error);
      })
    );
  }

  updateUser(id: number, user: Usuario): Observable<Usuario[]> {
      return this.http.put<Usuario[]>(`${this.apiUrl }/${id}`, user).pipe(
        tap(() => this.showMessage("Dados atualizados com sucesso!")),
        catchError(error => {
          console.log("valor do id ",user)
          this.showMessage(`Erro ao atualizar Dados: ${error.message || error}`);
          return of(); // Retorna um array vazio em caso de erro
        })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.showMessage("Dados deletado com sucesso!")),
        catchError(error => {
          this.showMessage(`Erro ao deletar Dados: ${error.message || error}`);
          return of(); // Retorna um array vazio em caso de erro
        })
      );
    }
    
}

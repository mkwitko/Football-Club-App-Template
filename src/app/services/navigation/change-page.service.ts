import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChangePageService {

  constructor(
    private router: Router
  ) { }

  changePage(rota: string){
    this.router.navigate([rota]);
  }
}

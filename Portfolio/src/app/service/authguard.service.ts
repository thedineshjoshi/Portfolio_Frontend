import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private _authService:AuthService) { }
  canActivate():boolean{
    if(this._authService.isTokenExpired())
    {
      this._authService.logout();
      return false;
    }
    else
    {
      return true;
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Login } from '../../Model/login.model';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _authService:AuthService, private _router:Router,private formBuilder:FormBuilder){}
  loginDetails:Login = new Login();
  loginForm:any = FormGroup;
  submitted = false;

  username: string = '';
  password: string = '';
  login()
  {
    this._authService.login(this.loginDetails).subscribe(
      res=>{
        let token = res.token;
        if(token)
        {
          window.localStorage.setItem("token",token);
          this.submitted = true;
          this._router.navigateByUrl("/dashboard");
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}

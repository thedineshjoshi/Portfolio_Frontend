import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { WindowRefService } from './window.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const window = new WindowRefService().nativeWindow;
  const token = window? window.localStorage.getItem('token'):null;

  if(token){
    const reqWithToken = req.clone({
      setHeaders: {
        Authorization:`Bearer ${token}`
      }
    });
    return next(reqWithToken)
  }
  else{
    return next(req);
  }
};
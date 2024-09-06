import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
function getWindow(): any {
  return typeof window !== 'undefined' ? window : null;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  get nativeWindow(): any {
    return getWindow();
  }
}



export const WINDOW = new InjectionToken<Window | null>('WindowToken', {
  factory: () => typeof window !== 'undefined' ? window : null
}

);
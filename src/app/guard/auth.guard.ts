import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard : CanActivateFn = (route,state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if(!token){
    router.navigate(['']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      router.navigate(['']);
      return false;
    }

    return true;

  } catch (error) {
    router.navigate(['']);
    return false;
  }
}
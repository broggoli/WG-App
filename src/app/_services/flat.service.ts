import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  constructor() { }

  linkFlatToUser(flatPointer: string, userPointer: string) {
    console.log(userPointer, flatPointer)
  }
}

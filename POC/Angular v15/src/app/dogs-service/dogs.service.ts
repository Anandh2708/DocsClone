import { Injectable } from '@angular/core';

export interface Dog{
  name: string;
  ownerName: string;
  description: string;
  photoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  dogs: Dog[] = [
    {
      name: 'Robbie',
      ownerName: 'Frank',
      description: 'Fido is a Labrador',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/640px-Labrador_on_Quantock_%282175262184%29.jpg'
    },
    {
      name: 'Neo',
      ownerName: 'Mari',
      description: 'Neo is a Husky',
      photoUrl: 'https://cdn.britannica.com/84/232784-050-1769B477/Siberian-Husky-dog.jpg'
    }

  ]
}

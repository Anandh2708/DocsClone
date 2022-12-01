import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dog, DogsService } from '../dogs-service/dogs.service';
import { DogsListCardComponent } from '../dogs-list-card/dogs-list-card.component';

@Component({
  selector: 'app-dogs-list',
  standalone: true,
  imports: [CommonModule, DogsListCardComponent],
  template:`
  <section class="hero-section">
    <h2 class="hero-text">
      Dogs
    </h2>
  </section>
  <article class="pet-list">
    <app-dogs-list-card *ngFor="let dog of Dogs let i = index" [index]="i" [dog]="dog" ></app-dogs-list-card>
  </article>
  `,
  styles: [`
  .pet-list{
    display: flex;
    flex-wrap: wrap;
  }
  
  .hero-text {
    font-size: 25pt;
    padding: 10px;
  }
  `]
})

export class DogsListComponent implements OnInit {

  Dogs:Dog[]

  constructor (private dogsService:DogsService) {
    this.Dogs = this.dogsService.dogs;

  }
  ngOnInit(): void {
    this.Dogs = this.dogsService.dogs;
  }
  

}

import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie?:Movie;
  castList ?: string[];
  @Input() width:number = 250;
  constructor() { }

  ngOnInit(): void {
    
  }

}

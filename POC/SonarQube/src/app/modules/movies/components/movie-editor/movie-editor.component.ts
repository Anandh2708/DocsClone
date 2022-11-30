import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../../models/Movie';


@Component({
  selector: 'movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.css']
})
export class MovieEditorComponent implements OnInit {
  @Input () movie?:Movie;
  @Output() movieChange = new EventEmitter<Movie>();
  @Output() save=new EventEmitter<Movie>();
  @Input() update = false;
  @Input() title:string="";
  @Input() submitName:string="";

  constructor(
    
  ) {
   
   }
  ngOnInit(): void {
    
  }
  async onSave(){
    
   
    this.movie!.availableSeats = this.movie?.totalSeats;
    console.log("editor movie",this.movie);
    this.movieChange.emit(this.movie);
    this.save.emit(this.movie);
  }
  

}

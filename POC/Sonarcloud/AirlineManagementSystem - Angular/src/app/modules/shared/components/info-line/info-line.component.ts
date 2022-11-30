import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'info-line',
  templateUrl: './info-line.component.html',
  styleUrls: ['./info-line.component.css']
})
export class InfoLineComponent implements OnInit {

  @Input() title:string='';

  @Input() value?:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}

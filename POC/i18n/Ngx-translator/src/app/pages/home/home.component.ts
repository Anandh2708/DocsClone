import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  constructor(private translateConfigService:TranslateConfigService){}
  ngOnInit():void{}
  changeLanguage(type: string) {
    this.translateConfigService.changeLanguage(type);
  }
    
  
}

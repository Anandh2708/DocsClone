import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'Angular-pwa2';

  constructor( private update:SwUpdate)
  {
        this.updateClient();
  }

  ngOnInit(): void {
    
  }

  updateClient(){
    if(!this.update.isEnabled){
        console.log('sw not enabled');
        return;
    }

    this.update.available.subscribe((event)=>{
      console.log('current update', event.current);
      console.log('available update', event.available);
    this.update.activateUpdate().then(()=>{
      console.log("update successfully")
      location.reload();
    });
      
    })


  }
}






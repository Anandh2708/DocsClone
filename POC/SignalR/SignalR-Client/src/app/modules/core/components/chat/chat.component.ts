import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';

const url='http://localhost:5294/chatHub';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  user:string='';
  message:string='';
  messages:any[]=[];
  connection:any;

  ngOnInit(): void {
    this.connection = new HubConnectionBuilder()
                            .withUrl(url)
                            .build();
    
    this.connection.on('ReceiveMessage', 
                        (user:string,message:string)=>
                            this.messages.push({user:user,message:message})
                      );
    this.connect();
  }

  async connect(){
    try{
      await this.connection.start();
    }
    catch(error:any){
      console.log('error on conection', error)
    }
  }

  sendMessage(){
    if(this.user!=''&&this.message!='')
      this.connection.invoke('SendMessage', this.user,this.message);
  }

}

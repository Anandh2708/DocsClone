import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

 
  constructor() { }
  @Input() title?:String="Confirmation";
  @Input() cancelText:string="Cancel";
  @Input() confirmText:String="Ok";
  @Input() confirmClass:String="btn-primary";
  @Input() cancelClass:String="btn-secondary";
  @Input() content:string="";
  @Input() preventDefault:boolean=false;

  @Input()  visible:boolean=false;
  @Output() visibleChange=new EventEmitter<boolean>();
  @Output() done=new EventEmitter<boolean>();
  
  handleDone(response:boolean){
    this.done.emit(response);
    if(!this.preventDefault){
      this.visible=false;
      this.visibleChange.emit(false);
    }
  }

  handleConfirm(){
    this.handleDone(true);
  }

  handleCancel(){
    this.handleDone(false);
  }

  ngOnInit(): void {
  }

}

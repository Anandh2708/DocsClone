import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user?:User;
  constructor(@Inject("UserService")private userService: UserService) { }
  updateUserStatus(details:any): void {
    if(details)
      this.user=details.user;
    else
      this.user=undefined;

  }

  ngOnInit(): void {
      console.log('membership component initialized');
      var details= this.userService.getLoggedInUser();
      if(details)
        this.user=details.user;


      this
        .userService
        .getUserStatusAnnouncement()
        .subscribe(details=>this.updateUserStatus(details))    
  }


  ngOnDestroy(): void {
   
    this.userService.getUserStatusAnnouncement().unsubscribe();
  }
  async handleLogout(){
    await this.userService.logout();
  }

}

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInDetails, User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css']
})
export class UserMembershipComponent implements OnInit, OnDestroy {

  constructor(
    @Inject("UserService")private userService: UserService,
    private router:Router
  ) { }

  user?:User;

  ngOnInit(): void {

    console.log('membership component initialized');
      var details= this.userService.getLoggedInUser();
      if(details)
        this.user=details.user;


      this
        .userService
        .getUserStatusAnnouncement()
        .subscribe(details=>this.updateUserStatus(details!))

      console.log('user',this.user);


  }

  updateUserStatus(details: LoggedInDetails): void {
    
    if(details)
      this.user=details.user;
    else
      this.user=undefined;

  }

  async handleLogout(){
    await this.userService.logout();
    this.router.navigate(['/']);

  }

  ngOnDestroy(): void {
   
    this.userService.getUserStatusAnnouncement().unsubscribe();
  }

}

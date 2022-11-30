import { Component, Inject, OnInit } from '@angular/core';
import { User} from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'user-profile-screen',
  templateUrl: './user-profile-screen.component.html',
  styleUrls: ['./user-profile-screen.component.css']
})
export class UserProfileScreenComponent implements OnInit {

  user?:User;
  constructor(
    @Inject("UserService")private userService: UserService,
  ) { }

  ngOnInit(): void {

    var details= this.userService.getLoggedInUser();

    this.user = details?.user;
     
  }

}

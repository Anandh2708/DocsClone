export interface LoginInfo{
    email:string;
    password?:string;
}

export interface User extends LoginInfo{
    name:string;
    profilePicture:string;
}

export interface LoggedInDetails{
    user:User;
    token:String;
}


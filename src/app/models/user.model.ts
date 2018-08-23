export class UserData{
    names: {
      firstName:  string;
      lastName:   string;
      userName:   string;
    };
    flatCode: string
}
export class User {
  pointer: string;
  userData: UserData;
}

export class LsUserData {
  loggedIn: boolean;
  data: UserData;
}
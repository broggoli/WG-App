export class RegisterData{
    join: boolean;    // true -> join, false -> create new Flat
    flatCode: string;
    flatCodeHash: string;
    userData: RegiterUserData;
    flatData: FlatData;
    flatMates: FlatMateRegister[]
}
export class RegiterUserData{
    names: {
      firstName:  string;
      lastName:   string;
      userName:   string;
    };
    passwords: {
      PW:        string;
      confirmPW: string;
    };
}
export class FlatData {
name: string;
}
export class FlatMateRegister {
names: {
    firstName:  string;
    lastName:   string;
}
}
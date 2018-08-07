import { User } from "../models/user.model"
export class Flat{
    flatPointer: string;
    mates: User[];              // pointers to mates in the users DB
    name: string;
}
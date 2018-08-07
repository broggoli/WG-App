import { User } from "./user.model"
export class Flat{
    flatPointer: string;
    residents: string[];              // pointers to mates in the users DB
    name: string;
    flatCode: string
}
import { User } from "./user.module"
export class Flat{
    flatPointer: string;
    mates: string[];              // pointers to mates in the users DB
    name: string;
}
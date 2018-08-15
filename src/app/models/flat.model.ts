import { User } from "./user.model"
export class Flat {
    flatPointer: string;
    residents: string[];              // pointers to mates in the users DB
    name: string;
    flatCode: string;

    receiptData: {
        receiptDBPointer: string;
        receiptCategories: string[];
        receipts: ReceiptEntry[]
    }
}

export class ReceiptEntry {
    date: Date;
    category: string;
    amount: number;
    item: string;
    price: number

}
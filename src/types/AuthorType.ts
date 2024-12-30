import { Book } from "./Book";
export interface AuthorCard {
    id: number;
    firstName: string, 
    lastName: string,
    coverUrl: string | null
}

export interface AuthorDetailsCard{
    id: number,
    firstName: string,
    lastName: string,
    coverUrl: string | null,
    birthDate: string,
    summary: string,
    books: Book[]
}
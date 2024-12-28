import { Author } from "./Book";

export interface BookDetails {
  id: number;
  coverUrl: string | null;
  genre: string;
  summary: string;
  title: string;
  comments: Comment[];
  author: Author;
}
export interface CommentUser{
    firstName: string;
    lastName: string;
}
export interface Comment{
    id: number;
    comment: string;
    createdAt: string;
    commentUser: CommentUser;
}
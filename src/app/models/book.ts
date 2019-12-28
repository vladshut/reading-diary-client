import {Author} from "@app/models/author";
import {Type} from "class-transformer";

export class Book {
  title: string;
  year: number;
  pages: number;
  isbn10: string;
  isbn13: string;
  lang: string;
  description: string;
  author_id: string;
  @Type(() => Author)
  author: Author;
  genres: string[];
  cover: string = '';
}

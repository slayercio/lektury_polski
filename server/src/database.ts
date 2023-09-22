import { Database } from "bun:sqlite";

export interface Book {
    id?: number;
    era: string;
    author: string;
    title: string;
    genre: string;
    theme: string;
    characters: string;
}

export class BooksDatabase {
    private db: Database;

    constructor() {
        this.db = new Database("db/books.db");

        this.init()
            .then(() => console.log("Database initialized"))
            .catch(console.error)
    }

    async getBooks() {
        return this.db.query('SELECT * FROM books').all();
    }

    async addBook() {
        
    }

    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, era TEXT, author TEXT, title TEXT, genre TEXT, theme TEXT, characters TEXT)');
    }
}
import { BooksDatabase } from "./database";

const database = new BooksDatabase()

async function send_random(req: Request) {
    const data = await database.getBooks();

    for(let x of data) {
        x.characters = x.characters.split(',')
    }

    return new Response(JSON.stringify(data))
}

Bun.serve({
    port: 3000,
    fetch(req, res) {
        var url = new URL(req.url);
        if(url.pathname === '/get_books') return send_random(req);

        return new Response("404");
    },

})
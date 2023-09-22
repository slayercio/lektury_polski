const books = JSON.parse(await Bun.file('./books.json').text()).books

function map(x: any[]) {
    for(let v of x) {
        if(v.era == "a") v.era = "Antyk";
        else if (v.era == "s") v.era = "Średniowiecze";
        else if (v.era == "r") v.era = "Renesans";
        else if (v.era == "b") v.era = "Barok";
        else if (v.era == "o") v.era = "Oświecenie";
        else if (v.era == "rm") v.era = "Romantyzm";
        else if (v.era == "p") v.era = "Pozytywizm";
        else v.era = "Nieznana";
    }

    return x;
}

function sql(x: any[]) {
    let commands = ["PRAGMA foreign_keys=OFF;", "BEGIN TRANSACTION;"]
    for(let v of x) {
        let id = x.indexOf(v);

        commands.push(`INSERT INTO books VALUES(${id}, '${v.era}', '${v.author}', '${v.title}', '${v.genre}', '${v.theme}', '${v.characters.join(',')}');`)
    }

    commands.push("DELETE FROM sqlite_sequence;")
    commands.push("COMMIT;")

    return commands.join('\n');
}

Bun.write('./commands.sql', sql(map(books)))
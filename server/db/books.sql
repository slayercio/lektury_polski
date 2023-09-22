PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, era TEXT, author TEXT, title TEXT, genre TEXT, theme TEXT, characters TEXT);
INSERT INTO books VALUES(0,'era','author','title','genre','theme','character1,character2');
DELETE FROM sqlite_sequence;
COMMIT;

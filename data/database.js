// Model types
class Book {
    constructor(id, title, author, description, pubDate) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.pubDate = pubDate;
    }
}

var model = require('./model-datastore');

function bookById(id) {
    return new Promise(function(resolve, reject) {
        model.read(id, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(new Book(
                    result.id,
                    result.title,
                    result.author,
                    result.description,
                    result.pubDate
                ));
            }
        });
    });
}

function getBooks() {
    return new Promise(function(resolve, reject) {
        model.list(10, false, function(err, results, cursor) {
            if (err) {
                reject(err);
            } else {
                resolve(results.map((result) => new Book(
                    result.id,
                    result.title,
                    result.author,
                    result.description,
                    result.pubDate
                )));
            }
        });
    });
}

class Viewer {}

var viewer = new Viewer();

module.exports = {
    Viewer,
    getViewer: () => viewer,

    bookById,
    getBooks,
    Book,
};

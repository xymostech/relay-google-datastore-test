// Model types
class Book {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.description = data.description;
        this.pubDate = data.pubDate;
    }
}

var model = require('./model-datastore');

function bookById(id) {
    return new Promise(function(resolve, reject) {
        model.read(id, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(new Book(result));
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
                resolve(results.map((result) => new Book(result)));
            }
        });
    });
}

function addBook(data) {
    return new Promise(function(resolve, reject) {
        model.create(data, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(new Book(result));
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

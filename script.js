const myLibrary = [];

function book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function() {
        return "${this.title} by ${this.author}, ${this.pages} pages, ${this.hasread}."
    }
}

function addBookToLibrary(title, author, pages, hasRead) {
    let newBook = book(title, author, pages, hasRead);
    myLibrary.push(newBook);
}

const container = document.querySelector("container")

function displayBooks() {
    for (var i = 0; i< myLibrary.length; i++) {
        let bookCard = document.createElement("div");
        bookCard.classList.add('book-card');
        container.appendChild(bookCard); 
        let bookTitle = document.createElement("h2");
        bookTitle.innerHTML("${myLibrary[i].title}");
        bookCard.appendChild(bookTitle);
        let bookAuthor = document.createTextNode('by ${myLibrary[i].author}')
        bookCard.appendChild(bookAuthor);
        let bookPages = document.createTextNode('${myLibrary[i].pages} pages')
        bookCard.appendChild(bookAuthor);
        if (myLibrary[i].hasRead === true) {
            let bookRead = document.createTextNode('Read');
            bookCard.appendChild(bookRead);
        } else {
            let bookRead = document.createTextNode('Have not read');
            bookCard.appendChild(bookRead);
        }
    }
}
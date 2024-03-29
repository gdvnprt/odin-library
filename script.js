let myLibrary = [];

class book {
    constructor(title) {
        this.title = title;
    };
    constructor(author) {
        this.author = author;
    };
    constructor(pages) {
        this.pages = pages;
    };
    constructor(hasRead) {
        this.hasRead = hasRead;
    };

    toggleReadStatus = function() {
        if (this.hasRead === "yesRead") {
            this.hasRead = "notRead";
            } else {
            this.hasRead = "yesRead"
        };
    };
};

function addBookToLibrary(title, author, pages, hasRead) {
    let newBook = new book(title, author, pages, hasRead);
    myLibrary.push(newBook);
};

const container = document.querySelector("#container")

function displayBooks() {
    for (var i = 0; i< myLibrary.length; i++) {
        let bookCard = document.createElement("div");
        bookCard.classList.add('book-card');
        container.appendChild(bookCard); 

        let bookTitle = document.createElement("h2");
        bookTitle.textContent = myLibrary[i].title;
        bookCard.appendChild(bookTitle);

        let bookAuthor = document.createElement('p');
        bookAuthor.classList.add("author-text");
        bookAuthor.textContent = 'by ' + myLibrary[i].author;
        bookCard.appendChild(bookAuthor);

        let bookPages = document.createElement("p");
        bookPages.classList.add("pages-text");
        bookPages.textContent = myLibrary[i].pages + ' pages';
        bookCard.appendChild(bookPages);

        if (myLibrary[i].hasRead === 'yesRead') {
            let bookRead = document.createElement("p");
            bookRead.classList.add("read-text");
            bookRead.textContent = "Read"
            bookCard.appendChild(bookRead);
        } else {
            let bookRead = document.createElement("p");
            bookRead.classList.add("read-text");
            bookRead.textContent = "Not Read"
            bookCard.appendChild(bookRead);
        }

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Remove Book";
        deleteButton.data = i;
        bookCard.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            let k = deleteButton.data;
            let l = myLibrary.length;
            if (l == 1 || l - 1 == k) {
                myLibrary.pop();
            } else {
                myLibrary = myLibrary.slice(0, k).concat(myLibrary.slice(k + 1));
            }
            clearDisplay();
            displayBooks();
        })

        let toggleRead = document.createElement("button");
        toggleRead.classList.add("toggle-button");
        toggleRead.textContent = "Change Read Status";
        bookCard.appendChild(toggleRead);

        toggleRead.addEventListener("click", () => {
            let data = deleteButton.data;
            myLibrary[data].toggleReadStatus();
            clearDisplay();
            displayBooks();
        });
    }
}

function clearDisplay() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

let bookButton = document.querySelector("#new-book");
let openForm = document.querySelector("#book-form");

bookButton.addEventListener("click", () => {
    openForm.open = true;
});

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const newBook = Object.fromEntries(fd);
    addBookToLibrary(newBook.title, newBook.author, newBook.pages, newBook.hasRead);

    clearDisplay();
    displayBooks();

    openForm.open = false;
    form.reset();
})
let myLibrary = [];

function book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function() {
        return "${this.title} by ${this.author}, ${this.pages} pages, ${this.hasread}."
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
        bookAuthor.textContent = 'by ' + myLibrary[i].author;
        bookCard.appendChild(bookAuthor);

        let bookPages = document.createElement("p");
        bookPages.textContent = myLibrary[i].pages + ' pages';
        bookCard.appendChild(bookPages);

        if (myLibrary[i].hasRead === 'yesRead') {
            let bookRead = document.createTextNode('Read');
            bookCard.appendChild(bookRead);
        } else {
            let bookRead = document.createTextNode('Have not read');
            bookCard.appendChild(bookRead);
        }

        let btnDiv = document.createElement("div");
        btnDiv.classList.add("book-buttons");
        bookCard.appendChild(btnDiv);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Remove Book";
        deleteButton.data = i;
        btnDiv.appendChild(deleteButton);

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
        btnDiv.appendChild(toggleRead);
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
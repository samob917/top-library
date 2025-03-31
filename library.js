let myLibrary = [];

class Book {
    constructor(title, pages, author, read) {
        this.title = title;
        this.pages = pages;
        this.author = author;
        this.read = read;
    }

    details() {
        return `${this.title}, by ${this.author}, is ${this.pages} long.`
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(title, pages, author, read) {
        const newBook = new Book(title, pages, author, read);
        this.library.push(newBook);
    }

    get books() {
        return this.library;
    }

    set books(bookList) {
        this.library = bookList;
    }
}

lib = new Library();

function handleDelete(e) {
    const parentDiv = e.target.parentNode;
    const library = parentDiv.parentNode;
    library.removeChild(parentDiv);
    const id = parentDiv.dataset.indexNumber;
    lib.books = lib.books.filter(book => book.id != id)
}

function handleRead(e) {
    const bookDiv = e.target.parentNode;
    const id = bookDiv.dataset.indexNumber;
    const books = lib.books.filter(book => book.id === id).map(book => book.toggleRead());
    displayLibrary();
}

function displayLibrary() {
    const library = document.querySelector(".lib");
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    for (book of lib.books) {
        let uuid = crypto.randomUUID();
        book.id = uuid;
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("data-index-number", uuid);
        bookDiv.classList.add("book");
        if (book.read) {
            bookDiv.setAttribute("style", "background: green;");
        } else {
            bookDiv.setAttribute("style", "background: red;");
        }
        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
        const bookAuthor = document.createElement("h3");
        bookAuthor.textContent = `By: ${book.author}`
        const bookPages = document.createElement("p")
        bookPages.textContent = `Pages: ${book.pages}`;

        const removeBook = document.createElement("button");
        removeBook.setAttribute("style", "gray: red; color: red;")
        removeBook.textContent = "Remove";
        removeBook.addEventListener("click", handleDelete);

        const readButton = document.createElement("button");
        readButton.textContent = "Read"
        readButton.addEventListener("click", handleRead);

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(readButton);
        bookDiv.appendChild(removeBook);
        library.appendChild(bookDiv);
    }
}

displayLibrary();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog .close-dialog");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

const submitButton = document.querySelector(".form-submit")

submitButton.addEventListener("click", () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    lib.addBookToLibrary(title, pages, author, read);
    displayLibrary();
    console.log(myLibrary);
    event.preventDefault();
    dialog.close();
    document.querySelector("form").reset();
})
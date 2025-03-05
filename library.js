const myLibrary = [];

function Book(title, pages, author) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.details = function() {
        return `${this.title}, by ${this.author}, is ${this.pages} long.`
    };
}

function addBookToLibrary(title, pages, author) {
    const newBook = new Book(title, pages, author);
    myLibrary.push(newBook);
}

console.log(myLibrary);
addBookToLibrary("You Like It Darker", 450, "Stephen King");
console.log(myLibrary);

function displayLibrary() {
    const library = document.querySelector(".lib");
    for (book of myLibrary) {
        const bookDiv = document.createElement("div");
        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
        const bookPages = document.createElement("p")
        bookPages.textContent = `Pages: ${book.pages}`;
        const bookAuthor = document.createElement("h3");
        bookAuthor.textContent = `By: ${book.author}`
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        library.appendChild(bookDiv);
    }
}

displayLibrary();



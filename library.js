let myLibrary = [];

function Book(title, pages, author, read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read;
    this.details = function() {
        return `${this.title}, by ${this.author}, is ${this.pages} long.`
    };
}

function addBookToLibrary(title, pages, author, read) {
    const newBook = new Book(title, pages, author, read);
    myLibrary.push(newBook);
}

console.log(myLibrary);
addBookToLibrary("You Like It Darker", 450, "Stephen King", true);
addBookToLibrary("Number Go Up", 260, "Zeke Faux", false);
addBookToLibrary("Number Go Up", 260, "Zeke Faux", true);
addBookToLibrary("Number Go Up", 260, "Zeke Faux", false);
addBookToLibrary("Number Go Up", 260, "Zeke Faux", false);
addBookToLibrary("Number Go Up", 260, "Zeke Faux", false);

function handleDelete(e) {
    const parentDiv = e.target.parentNode;
    const library = parentDiv.parentNode;
    library.removeChild(parentDiv);
    const id = parentDiv.dataset.indexNumber;
    myLibrary = myLibrary.filter(book => book.id != id)
}

function displayLibrary() {
    const library = document.querySelector(".lib");
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    for (book of myLibrary) {
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

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(removeBook);
        library.appendChild(bookDiv);
    }
}

displayLibrary();
console.log(myLibrary);

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
    addBookToLibrary(title, pages, author, read);
    displayLibrary();
    console.log(myLibrary);
    event.preventDefault();
    dialog.close();
    document.querySelector("form").reset();
})
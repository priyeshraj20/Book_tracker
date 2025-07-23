const library = document.getElementById("library");
const form = document.getElementById("book-form");

let books = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  const book = {
    id: Date.now(),
    title,
    author,
    pages
  };

  books.push(book);
  renderLibrary();
  form.reset();
});

function renderLibrary() {
  library.innerHTML = "";
  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <button onclick="editBook(${book.id})">Edit</button>
      <button onclick="deleteBook(${book.id})">Delete</button>
    `;

    library.appendChild(card);
  });
}

function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  renderLibrary();
}

function editBook(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("pages").value = book.pages;

  deleteBook(id); // Remove and re-add on submit
}

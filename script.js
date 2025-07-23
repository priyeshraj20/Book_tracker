const library = document.getElementById("library");
const form = document.getElementById("book-form");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const statusInput = document.getElementById("status");

let books = [];
let editId = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const status = statusInput.value;

  if (!title || !author || !pages || !status) return;

  if (editId) {
    // Editing existing book
    const book = books.find(b => b.id === editId);
    if (book) {
      book.title = title;
      book.author = author;
      book.pages = pages;
      book.status = status;
    }
    editId = null;
  } else {
    // New book
    const book = {
      id: Date.now(),
      title,
      author,
      pages,
      status
    };
    books.push(book);
  }

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
      <p class="book-status">📘 ${book.status}</p>
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

  titleInput.value = book.title;
  authorInput.value = book.author;
  pagesInput.value = book.pages;
  statusInput.value = book.status;

  editId = id;
}

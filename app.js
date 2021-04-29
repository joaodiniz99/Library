// Content
var content = document.getElementById('content');

// Form elements
var form = document.getElementById('submitForm');
var title = document.getElementById('titleInput');
var author  = document.getElementById('authorInput');
var pages = document.getElementById('pagesInput');
var read = document.getElementById('readInput');

// let myLibrary = [
//   {
//     title: 'Vinte Mil Léguas Submarinas',
//     author: 'Júlio Verne',
//     pages: 310
//   },
//   {
//     title: 'Discurso do Método',
//     author: 'René Descartes',
//     pages: 150
//   },
//   {
//     title: 'Harry Potter e a Pedra Filosofal',
//     author: 'J. K. Rowling',
//     pages: 300
//   },
//   {
//     title: 'A Dama das Camélias',
//     author: 'Alexandre Dumas',
//     pages: 150
//   }
// ];
let myLibrary = [];

// LocalStorage
const saveLocal = () => {
  localStorage.setItem('books', JSON.stringify(myLibrary));
  // console.log('Saved to localStorage');
}

const library = localStorage.getItem('books');
if(!library) {
  saveLocal();
} else {
  myLibrary = JSON.parse(library);
}

// Class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const changeReadStatus = ({ target }) => {
  const { id } = target.dataset;
  
  target.classList.toggle('read');
  myLibrary[id].read = !myLibrary[id].read;
  
  saveLocal();
}

// Remove book
const removeBookToLibrary = ({ target }) => {
  myLibrary.splice(target.dataset.id, 1);
  saveLocal();
  // loopBooks();
  target.parentElement.remove();
}

// Create new book html
function addBookToContainer (book, index) {

  // Book card
  var card = document.createElement('div');
  card.className = 'book';

  // Book title
  var title = document.createElement('p');
  title.className = 'book-title';
  title.innerText = book.title;

  // Book author
  var author = document.createElement('h3');
  author.className = 'book-author';
  author.innerText = book.author;

  // Book pages
  var pages = document.createElement('p');
  var pagesSpan = document.createElement('span');
  pages.className = 'book-pages';
  pagesSpan.className = 'book-pages-span';
  pagesSpan.innerHTML = book.pages;

  // Book remove
  var remove = document.createElement('button');
  remove.className = 'book-remove';
  remove.innerText = 'X';
  remove.dataset.id = index;
  remove.onclick = removeBookToLibrary;

  // Book read
  var readTag = document.createElement('button');
  readTag.className = 'book-read';
  if(book.read) {
    readTag.classList.add('read');
  } 
  readTag.innerHTML = '&#128065;';
  readTag.dataset.id = index;
  readTag.onclick = changeReadStatus;


  card.appendChild(remove);
  card.appendChild(title);
  card.appendChild(author);
  pages.appendChild(pagesSpan);
  pages.append(' pages');
  card.appendChild(pages);
  card.appendChild(readTag);
  content.appendChild(card);
}

// Loop and show books
function loopBooks() {
  content.innerHTML = '';
  for (const [index, book] of myLibrary.entries()) {
    addBookToContainer(book, index);
  }
}

loopBooks();

// Add new book
const addBookToLibrary = (event) => {
  event.preventDefault();

  const newBook = new Book(title.value, author.value, Number(pages.value), read.checked);

  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;

  modal.style.display = 'none';

  myLibrary.push(newBook);
  saveLocal();
  addBookToContainer(newBook, myLibrary.length - 1);
}

form.onsubmit = addBookToLibrary;
// Form elements
var form = document.getElementById('submitForm');
var title = document.getElementById('titleInput');
var author  = document.getElementById('authorInput');
var pages = document.getElementById('pagesInput');
var read = document.getElementById('readInput');

let myLibrary = [
  {
    title: 'Vinte Mil Léguas Submarinas',
    author: 'Júlio Verne',
    pages: 310
  },
  {
    title: 'Discurso do Método',
    author: 'René Descartes',
    pages: 150
  },
  {
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J. K. Rowling',
    pages: 300
  },
  {
    title: 'A Dama das Camélias',
    author: 'Alexandre Dumas',
    pages: 150
  }
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.info = () => {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
}


function addBookToLibrary(event) {
  event.preventDefault();
  console.log(read.checked);
}

function loading() {
  var loading = document.getElementById('loading');

  loading.classList.toggle('loading');
}

function loopBooks() {
  var content = document.getElementById('content');
  for (const book of myLibrary) {
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


    card.appendChild(title);
    card.appendChild(author);
    pages.appendChild(pagesSpan);
    pages.append(' pages');
    card.appendChild(pages);
    content.appendChild(card);

  }
  loading();
}

loopBooks();

form.onsubmit = addBookToLibrary;
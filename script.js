const modal = document.getElementById("form-wrapper");
const newBookBtn = document.getElementById("new-book");
const closeFormBtn = document.getElementById("close-form");
const form = document.getElementById("book-form");
const sumbitBtn = document.getElementById("submit");
const booklist = document.querySelector(".book-list");

let myLibrary = [];

function Book(data) {
  console.log(data);
  return Array.from(data.entries()).reduce((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {});
}

const addBookToLibrary = (book) => {
  myLibrary = [...myLibrary, { id: myLibrary.length + 1, ...book }];
};

function renderAllBooks() {
  booklist.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const bookEle = createBookElement(myLibrary[i]);
    booklist.appendChild(bookEle);
  }
}

const createBookElement = (data) => {
  const { author, id, pages, status, title } = data;

  const card = createHtmlElement({ tag: "li", className: "book-card" });

  const titleEle = createHtmlElement({
    tag: "h3",
    className: "book-title",
    text: title,
  });

  const deleteBtn = createHtmlElement({
    tag: "button",
    className: "icon-button",
    id: `${id}-book-del`,
    events: [{ method: "click", callback: deleteBook }],
  });
  const icon = createHtmlElement({
    tag: "img",
    src: "assets/delete.svg",
  });
  deleteBtn.appendChild(icon);

  const authorEle = createHtmlElement({
    tag: "h4",
    className: "book-author",
    text: author,
  });

  const pageEle = createHtmlElement({ tag: "span", text: pages });
  const iconPageEle = createHtmlElement({
    tag: "img",
    className: "icon",
    src: "assets/pages.svg",
    alt: "icon",
  });
  pageEle.appendChild(iconPageEle);
  console.log(pageEle);
  const OPTIONS = ["to-read", "in-progess", "done"];

  const optionsEleArray = OPTIONS.map((option) =>
    createHtmlElement({
      tag: "option",
      text: option.replace("-", " "),
      value: option,
      selected: option === status,
    })
  );
  const selectEle = createHtmlElement({
    tag: "select",
    className: "dropdown",
    name: "status",
    value: status,
    id: `${id}-status`,
    events: [{ method: "change", callback: updateStatus }],
  });
  optionsEleArray.forEach((option) => selectEle.appendChild(option));

  card.appendChild(titleEle);
  card.appendChild(deleteBtn);
  card.appendChild(authorEle);
  card.appendChild(pageEle);
  card.appendChild(selectEle);

  return card;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = Book(formData);
  addBookToLibrary(book);
  toggleForm(e);
  renderAllBooks();
  console.log(myLibrary);
};

const toggleForm = (e) => {
  e.preventDefault();
  const visible = modal.style.display;
  if (visible === "" || visible === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
};

const deleteBook = (event) => {
  myLibrary = myLibrary.filter(
    (book) => `${book.id}-book-del` !== event.target.id
  );
  renderAllBooks();
};

const updateStatus = (event) => {
  const { value } = event.target;
  
  myLibrary = myLibrary.map((book) => {
    if (`${book.id}-status` === event.target.id) {
      book.status = value;
    }
    return book;
  });

  renderAllBooks();
};

newBookBtn.addEventListener("click", toggleForm);
closeFormBtn.addEventListener("click", toggleForm);
form.addEventListener("submit", handleSubmit);

const createHtmlElement = ({
  tag,
  className,
  text,
  src,
  name,
  id,
  selected,
  value,
  events,
  alt,
}) => {
  const element = document.createElement(tag);
  if (className) element.classList = className;
  if (text) element.textContent = text;
  if (src) element.src = src;
  if (name) element.name = name;
  if (alt) element.alt = alt;
  if (value) element.value = value;
  if (id) element.id = id;
  if (selected) element.selected = true;
  if (events) {
    events.forEach((event) => {
      const { method, callback } = event;
      element.addEventListener(method, callback);
    });
  }

  return element;
};

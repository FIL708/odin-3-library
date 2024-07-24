const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function printAllBooks(params) {}

const modal = document.getElementById("form-wrapper");
const newBookBtn = document.getElementById("new-book");
const closeFormBtn = document.getElementById("close-form");

const toggleForm = (e) => {
  e.preventDefault();
  const visible = modal.style.display
  if (visible === "" || visible === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
};

newBookBtn.addEventListener('click', toggleForm)
closeFormBtn.addEventListener('click', toggleForm)
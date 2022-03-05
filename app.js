console.log(`This is the app to record the data of books in the libarary`);
viewBooks();

class booksIsuued {
  constructor(idOfBook, authorName, bookName) {
    this.bookId = idOfBook;
    this.authorName = authorName;
    this.bookName = bookName;
  }
}

class showData {
  display(book) {
    let showTable = document.getElementById("viewIssue");
    let html = `
        <tr>
        <td>${book.bookId}</td>
        <td>${book.authorName}</td>
        <td>${book.bookName}</td>
        <td><button class="btns "  >REMOVE</button></td>
    </tr>`;
    showTable.innerHTML += html;
  }
  validate(book) {
    // console.log(`checking books data`)
    if (
      book.bookId.length < 2 ||
      book.authorName.length < 2 ||
      book.bookName.length < 2
    ) {
      return false;
    } else {
      return true;
    }
  }
  clear() {
    // console.log(`clearing foam`);
    let form = document.getElementById("fillingDetails");
    form.reset();
  }
}

let add = document.getElementById("addBtn");
add.addEventListener("click", function (e) {
  // e.preventDefault();
  let id = document.getElementById("idOfbook").value;
  let name = document.getElementById("nameOfAuthor").value;
  let bName = document.getElementById("nameOfBook").value;
  let book = new booksIsuued(id, name, bName);
  // console.log(book);
  let show = new showData();
  if (show.validate(book)) {
    // show.display(book);
    show.clear();
    // console.log(`book added`)
    let localData = localStorage.getItem("issueData");
    if (localData == null) {
      issueBooks = [];
    } else {
      issueBooks = JSON.parse(localData);
    }

    issueBooks.push(book);
    localStorage.setItem("issueData", JSON.stringify(issueBooks));
    viewBooks();
  } else {
    // console.log(`book not added`)
  }
});

function deleteBtn(index) {
  // console.log(`I am deleting`, index);
  let localData = localStorage.getItem("issueData");
  if (localData == null) {
    issueBooks = [];
  } else {
    issueBooks = JSON.parse(localData);
  }
  issueBooks.splice(index, 1);
  localStorage.setItem("issueData", JSON.stringify(issueBooks));
  viewBooks();
}

function viewBooks() {
  let localData = localStorage.getItem("issueData");
  if (localData == null) {
    issueBooks = [];
  } else {
    issueBooks = JSON.parse(localData);
  }
  let html = "";
  issueBooks.forEach(function (element, index) {
    html += `
    <tr class="bookF">
    <td class="findClass">${element.bookId}</td>
    <td class="findClass">${element.authorName}</td>
    <td class="findClass">${element.bookName}</td>
    <td><button class="btns " id="${index}" onclick="deleteBtn(this.id)">REMOVE</button></td>
    </tr>`;
  });
  let showTable = document.getElementById("viewIssue");
  if (issueBooks.length != 0) {
    showTable.innerHTML = html;
  } else {
    showTable.innerHTML = `<h1>NO DATA PRESENT</h1>`;
    // console.log(`no data`);
  }
}

let find = document.getElementById("srh");
find.addEventListener("input", function () {
  let inputValue = find.value;
  // console.log(inputValue)
  let bookFind = document.getElementsByClassName("bookF");
  Array.from(bookFind).forEach(function (element) {
    bookFindName = element.innerText;
    if (bookFindName.includes(inputValue)) {
      element.style.display = "table-row";
    } else {
      element.style.display = "none";
    }
  });
});

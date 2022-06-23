console.log("Welcome to notes app");
shownotes();

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function () {
  let addtxt = document.getElementById("addTxt");
  let addtitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    title: addtitle.value,
    text: addtxt.value,
  };
  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addtxt.value = "";
  addtitle.value = "";
  shownotes();
});

function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <div id="forSearch">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            </div>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesobj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `You don't have any notes`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  shownotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element
      .getElementsByTagName("div")[1]
      .innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else element.style.display = "none";
  });
});

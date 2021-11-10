let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;

let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

optionsCont.addEventListener("click", (e) => {
  //true = tools show , false = hide tools
  optionsFlag = !optionsFlag;

  if (optionsFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "flex";
}
function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  //true => show pencil tool , false => hide pencil tool
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
    eraserFlag = false;
    eraserToolCont.style.display = "none";
  } else pencilToolCont.style.display = "none";
});

eraser.addEventListener("click", (e) => {
  //true => show eraser tool , false => hide eraser  tool
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    pencilFlag = false;
    eraserToolCont.style.display = "flex";
    pencilToolCont.style.display = "none";
  } else eraserToolCont.style.display = "none";
});

upload.addEventListener("click", (e) => {
  eraserToolCont.style.display = "none";
  pencilToolCont.style.display = "none";
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyTemplateHTML = `
          <div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
          </div>
          <div class="note-cont">
              <img src="${url}"/>
          </div>
        `;
        createSticky(stickyTemplateHTML);
  });
});

sticky.addEventListener("click", (e) => {
  eraserToolCont.style.display = "none";
  pencilToolCont.style.display = "none";
  let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false" ></textarea>
        </div>
    `;
  createSticky(stickyTemplateHTML);
});

function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  document.body.appendChild(stickyCont);
  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);
  let header = stickyCont.querySelector(".header-cont");
  header.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };
  header.ondragstart = function () {
    return false;
  };
}

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display == "none") {
      noteCont.style.display = "block";
    } else {
      noteCont.style.display = "none";
    }
  });
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;
  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener("mousemove", onMouseMove);
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}







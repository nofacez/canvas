let isDragging = false;

let startX = 0;
let startY = 0;
/** @type {HTMLElement} */
let selectedElement = null;

let isSpacePressed = false;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;
let panOffsetX = 0;
let panOffsetY = 0;

function init() {
  // #region Nodes
  const nodes = document.querySelectorAll(".node");
  nodes.forEach((node) => {
    node.addEventListener("mousedown", function (event) {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      selectedElement = this.parentElement;
      selectedElement.classList.add("dragging");
    });
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDragging || !selectedElement) return;

    const dx = (event.clientX - startX) / 1;
    const dy = (event.clientY - startY) / 1;

    selectedElement.style.left = `${
      parseInt(selectedElement.style.left, 10) + dx
    }px`;

    selectedElement.style.top = `${
      parseInt(selectedElement.style.top, 10) + dy
    }px`;

    startX = event.clientX;
    startY = event.clientY;
  });

  window.addEventListener("mouseup", function () {
    if (isDragging && selectedElement) {
      selectedElement.classList.remove("dragging");
      isDragging = false;
      selectedElement = null;
    }
  });
  // #endregion

  // #region Panning
  window.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      isSpacePressed = true;
      document.body.classList.add("will-pan");
    }
  });

  window.addEventListener("keyup", function (e) {
    if (e.code === "Space") {
      isSpacePressed = false;
      document.body.classList.remove("will-pan");
    }
  });

  window.addEventListener("mousedown", function (e) {
    if (isSpacePressed && !isDragging) {
      isPanning = true;
      document.body.style.cursor = "grabbing";
      panStartX = e.clientX - panOffsetX;
      panStartY = e.clientY - panOffsetY;
    }
  });

  window.addEventListener("mousemove", function (e) {
    if (isPanning) {
      panOffsetX = e.clientX - panStartX;
      panOffsetY = e.clientY - panStartY;

      document.body.style.setProperty("--pan-x", `${panOffsetX}px`);
      document.body.style.setProperty("--pan-y", `${panOffsetY}px`);
    }
  });

  window.addEventListener("mouseup", function () {
    if (isPanning) {
      isPanning = false;
      document.body.style.cursor = "";
    }
  });

  //#endregion
}

init();

const divContainer = document.querySelector('.div-container');
const clearBtn = document.querySelector('.clear-btn');
const colorBtn = document.querySelector('.color-btn');
const rainbowBtn = document.querySelector('.rainbow-btn');
const eraseBtn = document.querySelector('.erase-btn');

let selectedColor = "black";
let currentGridSize = 16;
let mousedown = 0;
let rainbowMode = 0;

function fillDiv(e) {
  if (mousedown === 1 || e.type === 'mousedown') {
    if (rainbowMode) {
      setRainbowColor(this);
    } else {
      this.style.backgroundColor = selectedColor;
    }
  }
  // console.log(this.style.backgroundColor);
}

function setRainbowColor(div) {
  let currentColor = div.style.backgroundColor;

  if (currentColor === "" || currentColor === "white") {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    for(let i = randomColor.length; i < 6; i++){
      randomColor = "0" + randomColor;
    }
    div.style.backgroundColor = "#" + randomColor;
  } else if (currentColor === "#000000" || currentColor === "black") {
    return;
  } else {
    div.style.backgroundColor = darkenColor(currentColor, 25);
  }
}

function darkenColor(rgb, amount) {
  rgb = rgb.substr(4).split(")")[0].split(", "); // Turn "rgb(r, g, b)" into [r, g, b]

  let r = +rgb[0];
  let g = +rgb[1];
  let b = +rgb[2];

  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

function populateGrid(n) {
  for (let i = 0; i < n*n; i++) {
    let div = document.createElement('div');
    div.style.width = `${32 / n}rem`;
    div.style.height = `${32 / n}rem`;
    if ((i !== 0) && (i % n === 0)) {
      div.style.clear = "both";
    }
    div.addEventListener('mouseover', fillDiv);
    div.addEventListener('mousedown', fillDiv);
    divContainer.appendChild(div);
  }
  currentGridSize = n;
}

divContainer.addEventListener('mousedown', () => {
  mousedown = 1;
});

window.addEventListener('mouseup', () => {
  mousedown = 0;
});

function clearGrid() {
  let gridSize = Number(window.prompt("Number of squares per side for the new grid?", currentGridSize));
  if (gridSize === 0) return;
  if (gridSize === currentGridSize) { // Clearing all cells is faster than creating a new grid
    const squares = Array.from(divContainer.children);
    squares.forEach(div => div.style.backgroundColor = "white");
  } else {
    divContainer.innerHTML = "";
    populateGrid(gridSize);
  }
}

function toggleColorMode() {
  selectedColor = "black";
  rainbowMode = 0;
  rainbowBtn.classList.remove("selected");
  eraseBtn.classList.remove("selected");
  colorBtn.classList.add("selected");
}

function toggleRainbowMode() {
  rainbowMode = 1;
  colorBtn.classList.remove("selected");
  eraseBtn.classList.remove("selected");
  rainbowBtn.classList.add("selected");
}

function toggleEraseMode() {
  selectedColor = "white";
  rainbowMode = 0;
  colorBtn.classList.remove("selected");
  rainbowBtn.classList.remove("selected");
  eraseBtn.classList.add("selected");
}

clearBtn.addEventListener('click', clearGrid);
colorBtn.addEventListener('click', toggleColorMode);
rainbowBtn.addEventListener('click', toggleRainbowMode);
eraseBtn.addEventListener('click', toggleEraseMode);

populateGrid(currentGridSize);

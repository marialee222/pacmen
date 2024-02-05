let pos = 0;
const pacArray = [
  ['./images/pacman1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan
function makePac() {
// returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
// Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/pacman1.png';
  newimg.width = 100;
  newimg.style.left = position.x + 'px';  // Make sure to add 'px' here
  newimg.style.top = position.y + 'px';   // Make sure to add 'px' here
  game.appendChild(newimg);
// new style of creating an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = `${item.position.x}px`;
    item.newimg.style.top = `${item.position.y}px`;
  });
  window.requestAnimationFrame(update);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;
  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

// Add event listener for keyboard controls
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  console.log('Key pressed:', event.key);
  pacMen.forEach((item) => {
    switch (event.key) {
      case 'ArrowUp':
        item.velocity = { x: 0, y: -2 };
        break;
      case 'ArrowDown':
        item.velocity = { x: 0, y: 2 };
        break;
      case 'ArrowLeft':
        item.velocity = { x: -2, y: 0 };
        break;
      case 'ArrowRight':
        item.velocity = { x: 2, y: 0 };
        break;
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add-button').addEventListener('click', makeOne);
  document.getElementById('start-button').addEventListener('click', update);
  // Set focus on the game area when the page loads
  document.getElementById('game').focus();
    // Add event listener for keyboard controls
  document.addEventListener('keydown', handleKeyPress);

});

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}

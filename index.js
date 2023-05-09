// Get the SVG canvas element
const svg = document.getElementById('svg');

// Define an array of shape types
const shapeTypes = ['circle', 'rect', 'polygon'];

// Create an array to store the shapes
const shapes = [];

// Set the viewBox attribute to make the SVG canvas responsive
svg.setAttribute('viewBox', `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

// Function to create a random shape
function createShape() {
  // Create a random shape element
  const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  const shape = document.createElementNS('http://www.w3.org/2000/svg', shapeType);

  // Set the random shape attributes
  switch (shapeType) {
    case 'circle':
      shape.setAttribute('cx', Math.random() * svg.clientWidth);
      shape.setAttribute('cy', Math.random() * svg.clientHeight);
      shape.setAttribute('r', Math.random() * 325 + 10);
      break;
    case 'rect':
      shape.setAttribute('x', Math.random() * svg.clientWidth);
      shape.setAttribute('y', Math.random() * svg.clientHeight);
      shape.setAttribute('width', Math.random() * 340 + 20);
      shape.setAttribute('height', Math.random() * 340 + 20);
      break;
    case 'polygon':
      const x1 = Math.random() * svg.clientWidth;
      const y1 = Math.random() * svg.clientHeight;
      const x2 = x1 + Math.random() * 340 + 20;
      const y2 = y1 + Math.random() * 340 + 20;
      const x3 = x1 + Math.random() * 340 + 20;
      const y3 = y1 + Math.random() * 340 + 20;
      shape.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
      break;
  }
  shape.setAttribute('fill', `hsl(${Math.random() * 360}, 50%, 80%)`);

  // Set velocity and direction attributes
  shape.setAttribute('velocity', Math.random() * 5 + 1);
  shape.setAttribute('direction', Math.random() * 360);

  // Append the random shape to the SVG canvas and the shapes array
  svg.appendChild(shape);
  shapes.push(shape);
}

// Function to move the shapes
function moveShapes() {
  shapes.forEach(function(shape) {
    // Get the shape's current position and velocity
    const x = parseFloat(shape.getAttribute('x') || shape.getAttribute('cx'));
    const y = parseFloat(shape.getAttribute('y') || shape.getAttribute('cy'));
    const velocity = parseFloat(shape.getAttribute('velocity') || 0);

    // Calculate the new position
    const direction = parseFloat(shape.getAttribute('direction')) * Math.PI/180;
    const vx = Math.cos(direction) * velocity * 0.5;
    const vy = Math.sin(direction) * velocity * 0.5;
    const newX = x + vx;
    const newY = y + vy;

    // Check if the shape has gone out of bounds
    const width = parseFloat(shape.getAttribute('width') || shape.getAttribute('r')) || 0;
    const height = parseFloat(shape.getAttribute('height') || shape.getAttribute('r')) || 0;
    const outOfBounds = newX < 0 || newX > svg.clientWidth - width || newY < 0 || newY > svg.clientHeight - height;

    // Update the shape's position and direction
    if (outOfBounds) {
      shape.setAttribute('direction', Math.random() * 360);
    } else {
      if (shape.tagName === 'circle') {
        shape.setAttribute('cx', newX);
        shape.setAttribute('cy', newY);
      } else {
        shape.setAttribute('x', newX);
        shape.setAttribute('y', newY);
      }
    }
  });
}

// Create 10 random shapes
for (let i = 0; i < 10; i++) {
  createShape();
}

// Move the shapes every 50 milliseconds
setInterval(moveShapes, 50);
// Get the SVG canvas element
const svg = document.getElementById('svg');

// Define an array of shape types
const shapeTypes = ['rect', 'ellipse', 'polygon', 'circle'];
console.log(shapeTypes)
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
    case 'ellipse':
      shape.setAttribute('cx', Math.random() * svg.clientWidth);
      shape.setAttribute('cy', Math.random() * svg.clientHeight);
      shape.setAttribute('rx', Math.random() * 250 + 10);
      shape.setAttribute('ry', Math.random() * 150 + 10);
      break;
    case 'polygon':
      const x1 = 100;
      const y1 = 100;
      const x2 = 200;
      const y2 = 200;
      const x3 = 300;
      const y3 = 100;
      shape.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
      const initialX = Math.random() * svg.clientWidth;
      const initialY = Math.random() * svg.clientHeight;
      shape.setAttribute('transform', `translate(${initialX}, ${initialY})`);
      console.log('triangle');
      break;
    default:
      console.log('Invalid shape');
      break;
  }

  // Generate a random pastel color with more variation
  const hue = Math.floor(Math.random() * 360); // random hue value (0-359)
  const saturation = Math.floor(Math.random() * 30) + 70; // random saturation value (70-100)
  const lightness = Math.floor(Math.random() * 30) + 50; // random lightness value (50-80)
  const pastelColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;


  // set the color
  shape.setAttribute('fill', pastelColor);

  // Set velocity and direction attributes
  shape.setAttribute('velocity', Math.random());
  shape.setAttribute('direction', Math.random() * 360);
  const rotationAngle = Math.random() * 180;
  //shape.setAttribute('transform', `rotate(${rotationAngle} ${shape.getAttribute('x')} ${shape.getAttribute('y')} )');

  // Create a filter element for the drop shadow
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'drop-shadow');

  // Create a feDropShadow element to define the shadow effect
  const dropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
  dropShadow.setAttribute('dx', 4);
  dropShadow.setAttribute('dy', 4);
  dropShadow.setAttribute('stdDeviation', 6);

  // Append the feDropShadow element to the filter element
  filter.appendChild(dropShadow);

  // Append the filter element to the SVG element
  svg.appendChild(filter);

  // Set the filter attribute of the rect element to the ID of the filter element
  shape.setAttribute('filter', 'url(#drop-shadow)');
  // Append the random shape to the SVG canvas and the shapes array
  svg.appendChild(shape);
  shapes.push(shape);
}

// Create 10 random shapes (3 of each type)
for (let i = 0; i < 5; i++) {
  createShape();

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
      shape.setAttribute('x', newX);
      shape.setAttribute('y', newY);
    }

  });
}

// Move the shapes every 50 milliseconds
setInterval(moveShapes, 1);
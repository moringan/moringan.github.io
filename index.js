const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapes = [];
const num = 5;
const links = [
  {text: 'Wesbite', address: 'index.html'},
  {text: 'Golfer Dysfunction', address: 'about.html'},
  {text: 'Anyone can come', address: 'contact.html'},
];


function createLinks(links) {
  links.forEach(link => {
    createRandomLink(link.text, link.address);
  });
}
function generateShape() {
  const shape = {};
  shape.size = Math.random() * 50 + 20; // random size between 20 and 70 pixels
  shape.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`; // random RGB color
  shape.type = Math.floor(Math.random() * 4); // random shape type (0 = rectangle, 1 = circle, 2 = triangle, 3 = polygon)
  shape.rotation = Math.random() * 360; // random rotation between 0 and 360 degrees
  shape.velocity = Math.random() * 0.4 + 0.1; // random velocity between 0.1 and 0.5
  shape.direction = Math.random() * 2 * Math.PI; // random direction between 0 and 2 * PI radians
  shape.x = Math.random() * (canvas.width - shape.size);
  shape.y = Math.random() * (canvas.height - shape.size);

  shapes.push(shape);
}
function drawShapes() {
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shapes.forEach(shape => {
    // Update the shape's position
    shape.x += Math.cos(shape.direction) * shape.velocity;
    shape.y += Math.sin(shape.direction) * shape.velocity;

    // Wrap the shape's position around the edges of the canvas if it goes out of bounds
    if (shape.x > canvas.width + shape.size || shape.x < -shape.size ||
        shape.y > canvas.height + shape.size || shape.y < -shape.size) {
      // If the shape goes out of bounds, remove it from the array
      const index = shapes.indexOf(shape);
      shapes.splice(index, 1);
    } else if ((shape.x < halfWidth - shape.size / 2 || shape.x > halfWidth + shape.size / 2) &&
               (shape.y < halfHeight - shape.size / 2 || shape.y > halfHeight + shape.size / 2)) {
      // If the shape reaches halfway to the edge of the canvas, change its properties
      shape.x = Math.random() * canvas.width;
      shape.y = Math.random() * canvas.height;
      shape.velocity = Math.random() * 0.2 + 0.1; // random velocity between 0.1 and 0.3
      shape.direction = Math.random() * 2 * Math.PI; // random direction between 0 and 2 * PI radians
    }

    // Save the current state of the context and apply the shape's transformation
    ctx.save();
    ctx.translate(shape.x + shape.size / 2, shape.y + shape.size / 2);
    ctx.rotate(shape.rotation * Math.PI / 180);
    ctx.translate(-shape.size / 2, -shape.size / 2);

    // Draw the shape
    ctx.beginPath();
    switch (shape.type) {
      case 0:
        ctx.rect(0, 0, shape.size, shape.size);
        break;
      case 1:
        ctx.arc(shape.size / 2, shape.size / 2, shape.size / 2, 0, 2 * Math.PI);
        break;
      case 2:
        ctx.moveTo(0, 0);
        ctx.lineTo(shape.size, 0);
        ctx.lineTo(shape.size / 2, shape.size);
        ctx.closePath();
        break;
      case 3:
        ctx.moveTo(0, 0);
        ctx.lineTo(shape.size, 0);
        ctx.lineTo(shape.size / 2, shape.size);
        ctx.lineTo(-shape.size / 2, shape.size);
        ctx.closePath();
        break;
    }
    ctx.fillStyle = shape.color;
    ctx.fill();

    // Restore the saved context state
    ctx.restore();
  });

  // Request the next animation frame to update the shapes' positions
  requestAnimationFrame(drawShapes);
}

function createRandomLink(linkText, linkAddress) {
  const link = document.createElement('a'); // create the link element
  link.textContent = linkText; // set the link text
  link.style.fontFamily = 'Franklin Gothic'; // set the font family

  // Set the font size to a random value between x-large and 4x-large
  link.style.fontSize = (Math.random() * 4 + 1) + 'em';

  // Set the position to absolute and a random left and top value
  link.style.position = 'absolute';
  let maxWidth = window.innerWidth - link.offsetWidth;
  link.style.left = Math.random() * window.innerWidth + 'px';
  link.style.top = Math.random() * window.innerHeight + 'px';

  // Set a random rotation angle between -45 and 45 degrees
  const rotation = Math.random() * 90 - 45;
  link.style.transform = `rotate(${rotation}deg)`;
  link.style.color = '#bfff80'; // set the link color to pastel lime green

  // Set the link destination to the specified HTML address
  link.href = linkAddress;

  // Remove the underline from the link
  link.style.textDecoration = 'none';

  document.body.appendChild(link); // add the link element to the page
}

for (let i = 0; i < num; i++) {
  generateShape();
}
drawShapes();
createLinks(links);
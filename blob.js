const svg = document.getElementById('svg');

svg.setAttribute('viewBox', `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

// Generate a random set of points to define the shape of the blob
const numPoints = Math.floor(Math.random() * 7) + 3;
const points = [];
for (let i = 0; i < numPoints; i++) {
  const x = Math.random() * displayWidth;
  const y = Math.random() * displayHeight;
  points.push({ x, y });
}

// Create a D3.js line generator to create the path
const line = d3.line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(d3.curveCardinalClosed);

// Use the line generator to create the path element
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', line(points));

// Set a random fill color for the blob
path.setAttribute('fill', `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);

// Append the path element to the SVG element
svg.appendChild(path);
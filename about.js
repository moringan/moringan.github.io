const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontUrl = 'Withheld Data.otf';

async function loadFont() {
  try {
    const response = await fetch(fontUrl);
    const fontData = await response.arrayBuffer();
    const font = new FontFace('Withheld Data', fontData);
    await font.load();
    document.fonts.add(font);
  } catch (error) {
    console.error(error);
  }
}

function generateRandomCharacter() {
  const index = Math.floor(Math.random() * characters.length);
  return characters.charAt(index);
}

async function draw() {
  await loadFont();
  ctx.font = '70px "Withheld Data", monospace';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'top';
  for (let x = 0; x < canvas.width; x += 70) {
    for (let y = 0; y < canvas.height; y += 70) {
      const character = generateRandomCharacter();
      ctx.fillText(character, x, y);
    }
  }
}

draw();
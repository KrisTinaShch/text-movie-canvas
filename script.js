// Create a canvas element and add it to the body
function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.innerHTML = ''; // Clear existing content
    document.body.appendChild(canvas);
    return canvas;
  }
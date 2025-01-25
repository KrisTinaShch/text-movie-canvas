// Create a canvas element and add it to the body
function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.innerHTML = ''; // Clear existing content
    document.body.appendChild(canvas);
    return canvas;
  }

  // Extract visible text content from the webpage
function getVisibleText() {
    const elements = document.querySelectorAll('body *');
    const text = [];
    elements.forEach((element) => {
      // Check if the element is visible and contains text
      if (element.offsetParent !== null && element.innerText.trim().length > 0) {
        text.push(element.innerText.trim());
      }
    });
    return text.join(' ').split('. ').map(sentence => sentence.trim());
  }
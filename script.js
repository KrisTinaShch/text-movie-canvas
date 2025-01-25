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

  // Animate text on the canvas
function animateText(canvas, sentences) {
    const ctx = canvas.getContext('2d');
    const fontSize = 30;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let currentSentenceIndex = 0;
    
    function displaySentence() {
      if (currentSentenceIndex >= sentences.length) return;
      
      const sentence = sentences[currentSentenceIndex];
      const sentenceLength = sentence.length;
      const displayTime = Math.min(5000, sentenceLength * 100); // Longer sentences are displayed longer
      
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for each new sentence
      ctx.fillText(sentence, canvas.width / 2, canvas.height / 2);
  
      currentSentenceIndex++;
      
      // Schedule the next sentence
      setTimeout(displaySentence, displayTime);
    }
    
    displaySentence();
  }
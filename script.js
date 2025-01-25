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


  // Download the result as a video (bonus functionality)
function downloadAsVideo(canvas) {
    const stream = canvas.captureStream(30); // 30 FPS
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
  
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'captured_text_video.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 10000); // Stop recording after 10 seconds
  }
  
  // Main function to execute the task
function main() {
    const canvas = createCanvas();
    const sentences = getVisibleText();
    animateText(canvas, sentences);
    // Enable video download after the animation completes (bonus)
    setTimeout(() => downloadAsVideo(canvas), sentences.length * 500);
  }
  
  // Run the main function after a short delay to allow the page to load
  setTimeout(main, 1000);
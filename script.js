// Axel Cotón Gutiérrez Copyright 2023
// Cargar archivos de audio desde la carpeta adecuada
const preguntaAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta3recta/master/audio/Pregunta.mp3');
const correctoAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta3recta/master/audio/Correcto.mp3');
const incorrectoAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta3recta/master/audio/Incorrecto.mp3');
const felicidadesAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta3recta/master/audio/Felicidades.mp3');
const intentarAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta3recta/master/audio/Intentar.mp3');

// Acceder al botón de silencio y al icono del megáfono en el DOM
const soundControl = document.querySelector('#sound-control');
const megaphoneIcon = document.querySelector('#megaphone-icon');

// Función para reproducir audio si el sonido está activado
function playAudio(audioElement) {
  if (soundControl.checked) {
    audioElement.play();
  }
}

// Evento clic para el icono del megáfono para reproducir la pregunta en audio
megaphoneIcon.addEventListener('click', () => playAudio(preguntaAudio));



document.addEventListener('DOMContentLoaded', function() {
  const numbers = document.querySelectorAll('.number');
  const startButton = document.getElementById('start-button');
  const questionElement = document.getElementById('question');
  const resultElement = document.getElementById('result');
  const playAgainButton = document.getElementById('play-again-button');

  let randomNumber;
  let previousRandomNumber;
  let score = 0;
  let questionsCount = 0;
  let isGameRunning = false;
  let isGameStarted = false;

  function resetGame() {
    numbers.forEach(number => {
      number.classList.remove('selected');
    });
    resultElement.innerHTML = '';
    score = 0;
    questionsCount = 0;
    isGameRunning = false;
    playAgainButton.style.display = 'none';
  }

  function getRandomNumber() {
    let newRandomNumber = Math.floor(Math.random() * 3) + 1;
    while (newRandomNumber === previousRandomNumber) {
      newRandomNumber = Math.floor(Math.random() * 3) + 1;
    }
    previousRandomNumber = newRandomNumber;
    return newRandomNumber;
  }

  function handleClick() {
    if (!isGameRunning) {
      return;
    }

    const selectedNumber = parseInt(this.textContent);

    if (selectedNumber === randomNumber) {
      this.classList.add('selected');
      resultElement.innerHTML = `
        <div class="message-container">
          <span class="msj correcto">¡Correcto!</span>
        </div>
      `;
      playAudio(correctoAudio);
      score++;
    } else {
      this.classList.add('selected');
      resultElement.innerHTML = `
        <div class="message-container">
          <span class="msj incorrecto">Incorrecto</span>
        </div>
      `;
      playAudio(incorrectoAudio);
    }

    questionsCount++;

    if (questionsCount === 5) {
      questionElement.textContent = `¡Juego completado! Preguntas acertadas: ${score} de ${questionsCount}.`;
      if (score === 5) {
        scoreElement.textContent += ` \u00A1Felicidades, lo has conseguido!`;
        scoreElement.style.color = "green";
        playAudio(felicidadesAudio);
      } else {
        scoreElement.textContent += ` \u00A1Vuelve a intentarlo!`;
        scoreElement.style.color = "red";
        playAudio(intentarAudio);
      }
      isGameRunning = false;
      playAgainButton.style.display = 'block';
    } else {
      setTimeout(() => {
        resultElement.innerHTML = '';
        generateQuestion();
      }, 1000);
    }
  }

  function handleStart() {
    if (!isGameStarted) {
      isGameStarted = true;
      startButton.style.display = 'none';
      isGameRunning = true;
      generateQuestion();
    }
  }

  function generateQuestion() {
    numbers.forEach(number => {
      number.classList.remove('selected');
    });
    randomNumber = getRandomNumber();
    questionElement.textContent = `¿En qué parte de la recta se encuentra el número ${randomNumber}?`;
  }

  function handlePlayAgain() {
    resetGame();
    isGameStarted = true;
    isGameRunning = true;
    generateQuestion();
  }

  numbers.forEach(number => {
    number.addEventListener('click', handleClick);
  });

  startButton.addEventListener('click', handleStart);
  playAgainButton.addEventListener('click', handlePlayAgain);

  // Mostrar el botón "Comenzar" al cargar la página
  resetGame();
  startButton.style.display = 'block';
});

 // Navegaciòn"  
 
 document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.menu');
      
  menuToggle.addEventListener('click', function() {
  menu.classList.toggle('active');
  });
});
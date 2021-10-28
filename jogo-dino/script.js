const sonicRunning = document.querySelector('.sonic'); // seleciona o sonic
const background = document.querySelector('.background');
let isJumping = false; // verifica se está pulando
let position = 0; // posição do sonic

const  handleKeyCode = ({ keyCode }) => { // lida com apertar a tecla
  if ((keyCode === 32) & !isJumping) {
    jump();
  };
};

const jump = () => { // função que lida com os pulos
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150) { // condição para parar de subir
      clearInterval(upInterval)

      let downInterval = setInterval(() => { // controla descida
      
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false;
        } else {
          position -= 18;
          sonicRunning.style.bottom = `${position}px`;          
        }
      }, 30);
    } else { // controla a subida
      position += 18;
      sonicRunning.style.bottom = `${position}px`;
    }
  }, 30) 
}

const createObstacle = () => {
  let obstaclePosition = 1250; // define posição inicial do obstaculo
  let randomTime = Math.random() * 6000; //randoniza o tempo que o obstaculo reaparece
  const resetButton = document.createElement('button'); // cria botao reset
  resetButton.classList.add('reset-button');
  resetButton.innerText = 'RESET';

  const obstacle = document.createElement('div'); // cria o obstaculo
  obstacle.classList.add('sonicObstacle');
  obstacle.style.left =  `1250`;
  background.appendChild(obstacle);

  let leftInterval = setInterval(() => { // lida com animaçao do obstaculo 
    obstaclePosition -= 10;
    obstacle.style.left = `${obstaclePosition}px`;

    if (obstaclePosition < -60) { // condiçao para resetar obstaculo e validar q sonic não bateu nele
      clearInterval(leftInterval);
      background.removeChild(obstacle);
    }
    else if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) { // lida com sonic bater no obstaculo
      clearInterval(leftInterval);
      document.body.innerText = 'GAME OVER';
      background.appendChild(resetButton);
    }
    else {
      obstaclePosition -= 10;
      obstacle.style.left = `${obstaclePosition}px`;
    };
  }, 25)

  setTimeout(createObstacle, randomTime);
}

createObstacle();

// define um evento de clicar na barra de espaço
document.addEventListener('keydown', handleKeyCode);

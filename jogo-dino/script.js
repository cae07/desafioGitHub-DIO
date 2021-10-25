const sonicRunning = document.querySelector('.sonic'); // seleciona o sonic
const background = document.querySelector('.background');
let isJumping = false; // verifica se está pulando

const  handleKeyCode = ({ keyCode }) => { // lida com apertar a tecla
  if ((keyCode === 32) & !isJumping) {
    jump();
  };
};

const jump = () => { // função que lida com os pulos
  let position = 0;
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
  const obstacle = document.createElement('div');
  let obstaclePosition = 1000;
  obstacle.classList.add('sonicObstacle');
  // sonicObstacle.style.left =  500 + 'px';
  background.appendChild(obstacle);
}

createObstacle();

// define um evento de clicar na barra de espaço
document.addEventListener('keydown', handleKeyCode);

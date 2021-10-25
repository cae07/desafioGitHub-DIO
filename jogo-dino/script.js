// seleciona o sonic
const sonicRunning = document.querySelector('.sonic');
let isJumping = false; // verifica se está pulando

// define um evento de clicar na barra de espaço
const  handleKeyCode = ({ keyCode }) => {
  if ((keyCode === 32) & !isJumping) {
    jump();
  };
};

// função que lida com os pulos
const jump = () => {
  let position = 0;
  isJumping = true;
  let upInterval = setInterval(() => {
    // condição para parar de subir
    if (position >= 150) {
      clearInterval(upInterval)
      // controla a descida
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false;
        } else {
          position -= 20;
          sonicRunning.style.bottom = `${position}px`;          
        }
      }, 30);
    } else {
      // controla a subida
      position += 20;
      sonicRunning.style.bottom = `${position}px`;
    }
  }, 30) 
}

document.addEventListener('keyup', handleKeyCode);

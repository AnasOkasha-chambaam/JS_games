let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 6;

    const game = document.querySelector('#game'),
          minNum = document.querySelector('.min-num'),
          maxNum = document.querySelector('.max-num'),
          guessInput = document.querySelector('#guess-input'),
          guessBtn = document.querySelector('#guess-btn'),
          message = document.querySelector('.message'),
          form = document.querySelector('form');

minNum.textContent = min;
maxNum.textContent = max;

function getRandomNum(min, max) {
  return Math.floor((Math.random()*(max-min+1))+min);
}
console.log(winningNum);

form.addEventListener('submit', startGame);
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('reload')) {
    window.location.reload();
    console.log(1);
    e.preventDefault()
  }
})

function startGame(e) {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess > max || guess < min) {
    // guessInput.disabled = true;
    guessesLeft -= 2;
    if(guessesLeft === 0 || guessesLeft < 0) {
      guessInput.disabled = true;
      setMessage(`You lost,the correct num is ${winningNum}. GOOD LUCK next time`, 'red');
      guessBtn.className = 'reload ';
      guessBtn.value = 'play again!';
    } else {
    setMessage(`Please, insert a num between ${min} and ${max} only.Any other values will make you LOSE two tries.you have ${guessesLeft} gusse(s) now.`, 'red')
    guessInput.value = '';
    // message.style.color = 'red';
    // message.textContent = `Please, insert a num between ${min} and ${max} only.Any other values will make you LOSE tow tries.`;
    }

    
  } else if (guess === winningNum) {
    guessInput.disabled = true;
    setMessage(`${guess} is the correct num, congratulations! YOU WON!.`, 'green');
    guessBtn.className = 'reload ';
      guessBtn.value = 'play again!';
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0){
      guessInput.disabled = true;
      setMessage(`You lost,the correct num is ${winningNum}. GOOD LUCK next time`, 'red');
      guessBtn.className = 'reload ';
      guessBtn.value = 'play again!';
    } else {
      setMessage(`${guess} is not the correct num, try choosing another one.you still have ${guessesLeft} guesse(s)`, 'rgb(197, 62, 0)');
      guessInput.value = '';

    }
  }

  e.preventDefault();
}

function setMessage(msg, clr) {
  guessInput.style.borderColor = clr;
  message.style.color = clr;
  message.textContent = msg;

}
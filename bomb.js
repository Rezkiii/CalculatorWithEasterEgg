let code = '';
let timerValue = 40;
let timerInterval;
const tickSound = new Audio('tick.mp3'); 


function startTimer() {
    timerInterval = setInterval(() => {
        timerValue--;
        document.getElementById('timer').textContent = timerValue;

        if (timerValue <= 0) {
            clearInterval(timerInterval);
            tickSound.pause(); 
            tickSound.currentTime = 0;
            explodeBomb();
        } else {
            tickSound.play(); 
        }
    }, 1000);
}


function addDigit(digit) {
    if (code.length < 4) {
        code += digit;
        document.getElementById('codeDisplay').textContent = code.padStart(4, '0');
    }
}


function disarmBomb() {
    clearInterval(timerInterval);
    tickSound.pause(); 
    tickSound.currentTime = 0; 

    if (code === '1234') {
        document.getElementById('message').textContent = "Bomb disarmed! You are safe.";
        setTimeout(() => {
            window.location.href = "congratulation.html";
        }, 2000);
    } else {
        document.getElementById('message').textContent = "Wrong code! The bomb exploded!";
        explodeBomb();
    }
    disableButtons();
}


function explodeBomb() {
    document.getElementById('explodedMessage').style.display = 'block';
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }, 2000);
}


function disableButtons() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.disabled = true);
}


window.onload = function() {
   
    document.body.addEventListener('click', function() {
        startTimer();
        tickSound.play(); 
        this.removeEventListener('click', arguments.callee); 
    });
};
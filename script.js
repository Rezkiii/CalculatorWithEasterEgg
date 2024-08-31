const layar = document.getElementById('layar');
const tombol = document.querySelectorAll('.tombol button');
const clickSound = new Audio('click.mp3');
const transisiSound = new Audio('transisi.mp3'); 

let angkaPertama = '';
let operator = '';
let angkaKedua = '';
let smileyCount = 0;
let lastActivity = Date.now();

tombol.forEach(btn => {
    btn.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();

        const nilaiTombol = btn.textContent;

     
        if (Date.now() - lastActivity > 30000) {
            smileyCount = 0;
        }

        lastActivity = Date.now();

        if (!isNaN(nilaiTombol) || nilaiTombol === '.') {
            layar.value += nilaiTombol;
        } else if (nilaiTombol === 'C') {
            layar.value = '';
            angkaPertama = '';
            operator = '';
            angkaKedua = '';
            smileyCount = 0;
        } else if (['+', '-', '*', '/'].includes(nilaiTombol)) {
            angkaPertama = layar.value;
            operator = nilaiTombol;
            layar.value = '';
            smileyCount = 0;
        } else if (nilaiTombol === '=') {
            angkaKedua = layar.value;
            let hasil;
            switch (operator) {
                case '+':
                    hasil = parseFloat(angkaPertama) + parseFloat(angkaKedua);
                    break;
                case '-':
                    hasil = parseFloat(angkaPertama) - parseFloat(angkaKedua);
                    break;
                case '*':
                    hasil = parseFloat(angkaPertama) * parseFloat(angkaKedua);
                    break;
                case '/':
                    hasil = parseFloat(angkaPertama) / parseFloat(angkaKedua);
                    break;
            }
            layar.value = hasil;
            angkaPertama = '';
            operator = '';
            angkaKedua = '';
            smileyCount = 0;
        } else if (nilaiTombol === ':)') {
            smileyCount++;
            if (smileyCount === 3) {
                layar.value = "Well don't do that please";
            } else if (smileyCount === 5) {
                layar.value = "Please don't make me do this";
            } else if (smileyCount === 7) {
                layar.value = "Okay >:(";
            } else if (smileyCount === 10) {
                transisiSound.play(); 
                layar.classList.add('transition'); 
                setTimeout(() => {
                    layar.classList.remove('transition'); 
                    window.location.href = "hello.html"; 
                }, 500); 
            }
        }
    });
});
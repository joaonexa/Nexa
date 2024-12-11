// Seleciona o container do carrossel e os slides
const carrosselSlide = document.querySelector('.carrossel-slide');
const slides = document.querySelectorAll('.carrossel-slide img');
const totalSlides = slides.length;

// Variável para rastrear o slide atual
let index = 0;

// Clona o primeiro e o último slide para criar o efeito de loop
const primeiroSlide = slides[0].cloneNode(true);
const ultimoSlide = slides[totalSlides - 1].cloneNode(true);
carrosselSlide.appendChild(primeiroSlide); // Adiciona o primeiro slide ao final
carrosselSlide.insertBefore(ultimoSlide, slides[0]); // Adiciona o último slide ao início

// Ajusta a posição inicial
carrosselSlide.style.transform = `translateX(-100%)`;

// Função para mover o carrossel
function moverCarrossel() {
    carrosselSlide.style.transition = 'transform 1s ease-in-out';
    carrosselSlide.style.transform = `translateX(-${(index + 1) * 100}%)`;
}

// Função para verificar e ajustar o loop
function ajustarLoop() {
    carrosselSlide.style.transition = 'none'; // Remove a transição para reposicionar instantaneamente
    if (index === -1) {
        index = totalSlides - 1; // Vai para o último slide real
        carrosselSlide.style.transform = `translateX(-${(index + 1) * 100}%)`;
    } else if (index === totalSlides) {
        index = 0; // Volta ao primeiro slide real
        carrosselSlide.style.transform = `translateX(-${(index + 1) * 100}%)`;
    }
}

// Configura o intervalo para a rolagem automática (7 segundos)
function autoCarrossel() {
    index++;
    moverCarrossel();
    setTimeout(ajustarLoop, 1000); // Aguarda a transição antes de ajustar o loop
}

let intervalo = setInterval(autoCarrossel, 7000);

// Botões de navegação
document.getElementById('anterior').addEventListener('click', () => {
    clearInterval(intervalo); // Pausa a rolagem automática
    index--;
    moverCarrossel();
    setTimeout(ajustarLoop, 1000);
    intervalo = setInterval(autoCarrossel, 7000); // Reinicia o intervalo
});

document.getElementById('proximo').addEventListener('click', () => {
    clearInterval(intervalo); // Pausa a rolagem automática
    index++;
    moverCarrossel();
    setTimeout(ajustarLoop, 1000);
    intervalo = setInterval(autoCarrossel, 7000); // Reinicia o intervalo
});

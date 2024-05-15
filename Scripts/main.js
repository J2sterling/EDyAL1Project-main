// main.js
import { calcularScoreBoard } from './util.js';

// Event listener para el botón "Ordenar"
document.getElementById('ordenar').addEventListener('click', () => {
    const entrada = document.getElementById('entrada').value; // Obtener el valor del textarea de entrada
    const salida = calcularScoreBoard(entrada); // Calcular el scoreboard
    document.getElementById('salida').value = salida; // Mostrar el resultado en el textarea de salida
});

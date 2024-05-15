// Importar la clase Submission desde el archivo Submission.js
import { Submission } from './Submission.js';

function calcularScoreBoard(caso) {
    let submissions = caso.split(";"); // Para separar las entregas 
    let tiempoP = {}; // Objeto para almacenar los tiempos de penalización de cada equipo
    let problemasR = {}; // Objeto para almacenar los problemas resueltos de cada equipo
    let intentos = {}; // Objeto para almacenar los intentos incorrectos de cada equipo por problema

    // Crear instancias de Submission para cada entrada
    let submissionObjects = submissions.map(submission => {
        let [concursante, problema, tiempo, l] = submission.trim().split(" ");
        return new Submission(concursante, problema, parseInt(tiempo), l);
    });

    // Procesar cada Submission
    submissionObjects.forEach(submission => {
        let { concursante, problema, tiempo, l } = submission;

        // Inicializar estructuras si es la primera vez que vemos este equipo/problema
        if (!tiempoP[concursante]) {
            tiempoP[concursante] = 0;
            problemasR[concursante] = 0;
            intentos[concursante] = {};
        }

        if (!intentos[concursante][problema]) {
            intentos[concursante][problema] = 0;
        }

        // Calcular el número de problemas resueltos y tiempo de penalización
        if (l === "C" && intentos[concursante][problema] !== -1) {
            problemasR[concursante]++;
            tiempoP[concursante] += tiempo + 20 * intentos[concursante][problema];
            intentos[concursante][problema] = -1; // Marcar el problema como resuelto
        } else if (l === "I" && intentos[concursante][problema] !== -1) {
            intentos[concursante][problema]++;
        }
    });

    // Crear un array de resultados para ordenamiento
    let resultados = Object.keys(tiempoP).map(concursante => ({
        concursante: concursante,
        problemasResueltos: problemasR[concursante] || 0,
        tiempoPenalizacion: tiempoP[concursante]
    }));

    // Ordenar los resultados
    resultados.sort((a, b) => {
        // Orden descendente por número de problemas resueltos
        if (b.problemasResueltos !== a.problemasResueltos) {
            return b.problemasResueltos - a.problemasResueltos;
        }

        // Orden ascendente por tiempo de penalización
        if (a.tiempoPenalizacion !== b.tiempoPenalizacion) {
            return a.tiempoPenalizacion - b.tiempoPenalizacion;
        }

        // Orden ascendente por número de equipo 
        return a.concursante.localeCompare(b.concursante, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Generar la cadena de resultados con columnas alineadas
    let res = resultados.map(entry => 
        `${entry.concursante.padEnd(7)} ${String(entry.problemasResueltos).padEnd(3)} ${String(entry.tiempoPenalizacion).padEnd(4)}`
    ).join("\n");
    
    return res;
}

export { calcularScoreBoard };



// Genera un número aleatorio entre 1 y 100, y se guarda en una variable.
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

///// Selección de elementos del DOM para mostrar información al usuario:
// -- Números que el usuario ha introducido para probar
const valoresIntroducidos = document.querySelector(".valoresIntroducidos");
// -- Cantidad de veces que el usuario a intentado adivinar
const mostrar_vecesAdivinadas = document.querySelector(".numeroDeIntentos");
// -- Contenedor para mostrar las adivinanzas
let cajaAdivinanzas = document.querySelector(".cajaIntentos");
// -- Muestra el resultado final (éxito/fracaso)
const resultadoFinal = document.querySelector(".ultimoResultado");
// -- Da pistas si el número es mayor o menor
const menor_o_mayor = document.querySelector(".menorOMayor");

// Selecciona el campo de entrada
const campoEscribirNumero = document.querySelector(".cajaDeEntrada");
// Selecciona el botón de envío
const botonProbarNumero = document.querySelector(".botonRespuesta");

// Número de veces que el usuario ha adivinado (se inicializa en 1)
let vecesAdivinadas = 1;

// Variable para el botón de reset del juego
let botonReseteo;


// Función principal que verifica el intento del usuario
function adivinarIntento() {

  // Obtiene el valor numérico ingresado por el usuario
  let intentoNumeroUsuario = Number(campoEscribirNumero.value);

  // Si es el primer intento, inicializa la visualización
  if (vecesAdivinadas === 1) {
    valoresIntroducidos.textContent = "VALORES introducidos: | ";
    cajaAdivinanzas.style.display = "block"; // Muestra el contenedor de adivinanzas
  }

  // Actualiza la lista de números introducidos
  valoresIntroducidos.textContent += intentoNumeroUsuario + " | ";
  // Actualiza el número de intentos del usuario
  mostrar_vecesAdivinadas.textContent = "Nº intentos: " + vecesAdivinadas + "/10";


  ///// Verifica si el usuario acertó
  
  // Su el usuario acierta el número
  if (intentoNumeroUsuario === numeroAleatorio) {
    resultadoFinal.textContent = "¡Felicidades! ¡Lo adivinaste!";
    resultadoFinal.style.backgroundColor = "green";
    menor_o_mayor.textContent = "";
    finDeJuego();

    // Si se agotan los 10 intentos
  } else if (vecesAdivinadas === 10) {
    resultadoFinal.innerHTML = 'No tienes más intentos <br> FIN DE JUEGO';
    menor_o_mayor.textContent = "";
    finDeJuego();

    // Si el intento es incorrecto pero quedan más oportunidades
  } else {
    resultadoFinal.innerHTML = "Número incorrecto,<br><strong>intenta de nuevo</strong>";
    resultadoFinal.style.backgroundColor = "red";
    // Pistas sobre si el número es mayor o menor
    if (intentoNumeroUsuario < numeroAleatorio) {
      menor_o_mayor.textContent = "¡El número secreto es MAYOR!";
    } else if (intentoNumeroUsuario > numeroAleatorio) {
      menor_o_mayor.textContent = "¡El número secreto es MENOR!";
    }
  }

  // Prepara para el siguiente intento
  vecesAdivinadas++;
  // Limpia el campo de entrada
  campoEscribirNumero.value = "";
}


// Asigna el evento click al botón para verificar el número
botonProbarNumero.addEventListener("click", adivinarIntento);


// Función que finaliza el juego
function finDeJuego() {
  // Deshabilita la entrada y el botón
  campoEscribirNumero.disabled = true;
  botonProbarNumero.disabled = true;

  // Crea y muestra el botón de reinicio
  botonReseteo = document.createElement("button");
  document.querySelector("article").append(botonReseteo);
  botonReseteo.textContent = "Iniciar nuevo juego";
  botonReseteo.addEventListener("click", resetearJuego);
}


// Función para reiniciar el juego
function resetearJuego() {

  // Restablece el contador de intentos
  vecesAdivinadas = 1;

  // Restablece el contador de intentos 
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  // Elimina el botón de reinicio
  botonReseteo.parentNode.removeChild(botonReseteo);

  // Oculta el contenedor de adivinanzas
  cajaAdivinanzas.style.display = "none";

  // Habilita los controles de juego
  campoEscribirNumero.disabled = false; 
  botonProbarNumero.disabled = false;
  campoEscribirNumero.value = "";
  campoEscribirNumero.focus(); // Pone el foco en el campo de entrada
  resultadoFinal.style.backgroundColor = "white";

  // Genera un nuevo número aleatorio para el siguiente juego
  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
}
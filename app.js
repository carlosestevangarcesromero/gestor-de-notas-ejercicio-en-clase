// 1. Tomamos los elementos del HTML que vamos a usar
const formulario = document.getElementById("formulario");
const error = document.getElementById("error");
const resultado = document.getElementById("resultado");

// 2. Calcula el promedio de una lista de notas
function calcularPromedio(notas) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma = suma + notas[i];
  }
  return suma / notas.length;
}

// 3. Devuelve el desempeño según el promedio
//    < 3.0 Reprobado | 3.0 a 3.9 Regular | 4.0 a 4.5 Bueno | > 4.5 Excelente
function obtenerDesempeno(promedio) {
  if (promedio < 3.0) {
    return "Reprobado";
  } else if (promedio < 4.0) {
    return "Regular";
  } else if (promedio <= 4.5) {
    return "Bueno";
  } else {
    return "Excelente";
  }
}

// 4. Lee las 4 notas de un estudiante (por su clase CSS) y las convierte a número
function leerNotas(clase) {
  const campos = document.querySelectorAll("." + clase);
  const notas = [];
  for (let i = 0; i < campos.length; i++) {
    notas.push(parseFloat(campos[i].value));
  }
  return notas;
}

// 5. Revisa que todas las notas estén entre 1 y 5
function notasValidas(notas) {
  for (let i = 0; i < notas.length; i++) {
    if (isNaN(notas[i]) || notas[i] < 1 || notas[i] > 5) {
      return false;
    }
  }
  return true;
}

// 6. Arma la tarjeta HTML con el resultado de un estudiante
function crearTarjeta(nombre, notas, promedio, desempeno) {
  return `
    <div class="tarjeta ${desempeno.toLowerCase()}">
      <h3>${nombre}</h3>
      <p>Notas: ${notas.join(" - ")}</p>
      <p>Promedio: <strong>${promedio}</strong></p>
      <p>Desempeño: <strong>${desempeno}</strong></p>
    </div>
  `;
}

// 7. Cuando se envía el formulario, hacemos todo el proceso
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Evita que la página se recargue

  // Limpiamos mensajes anteriores
  error.textContent = "";
  resultado.innerHTML = "";

  // Leemos los datos
  const docente = document.getElementById("docente").value.trim();
  const estudiante1 = document.getElementById("est1").value.trim();
  const estudiante2 = document.getElementById("est2").value.trim();
  const notas1 = leerNotas("nota1");
  const notas2 = leerNotas("nota2");

  // Validamos la escala de 1 a 5
  if (!notasValidas(notas1) || !notasValidas(notas2)) {
    error.textContent = "Todas las notas deben estar entre 1.0 y 5.0";
    return; // Detenemos el proceso
  }

  // Calculamos promedios redondeados a 1 decimal
  const promedio1 = Number(calcularPromedio(notas1).toFixed(1));
  const promedio2 = Number(calcularPromedio(notas2).toFixed(1));

  // Mostramos los resultados en pantalla
  resultado.innerHTML =
    `<h2>Docente: ${docente}</h2>` +
    crearTarjeta(estudiante1, notas1, promedio1, obtenerDesempeno(promedio1)) +
    crearTarjeta(estudiante2, notas2, promedio2, obtenerDesempeno(promedio2));
});

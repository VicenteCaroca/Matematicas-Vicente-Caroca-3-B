
let b = 0;
let c = 0;

function generar() {
    b = Math.floor(Math.random() * 21) - 10;
    c = Math.floor(Math.random() * 21) - 10;

    document.getElementById("valor-b").textContent = b;
    document.getElementById("valor-c").textContent = c;

    let funcion = "f(x) = " + b + "x";

    if (c > 0) {
        funcion += " + " + c;
    } else if (c < 0) {
        funcion += " - " + Math.abs(c);
    }

    document.getElementById("expresion").textContent = funcion;
    document.getElementById("expresion-geogebra").textContent = funcion;

    if (c == 0) {
        document.getElementById("tipo-funcion").textContent = "Función lineal (F.L.)";
        document.getElementById("condicion").textContent = "Es lineal porque c vale 0.";
        document.getElementById("resultado").classList.remove("afín");
    } else {
        document.getElementById("tipo-funcion").textContent = "Función afín (F.A.)";
        document.getElementById("condicion").textContent = "Es afín porque c es distinto de 0.";
        document.getElementById("resultado").classList.add("afín");
    }

    mostrar();
    graficar();
}

function mostrar() {
    let pendiente = "";
    let paso = "";
    let traslado = "";

    if (b > 0) {
        pendiente = "La recta es creciente porque sube de izquierda a derecha.";
    } else if (b < 0) {
        pendiente = "La recta es decreciente porque baja de izquierda a derecha.";
    } else {
        pendiente = "La recta es horizontal porque su pendiente vale 0.";
    }

    if (c == 0) {
        paso = "La recta pasa por el origen (0, 0).";
    } else {
        paso = "La recta no pasa por el origen.";
    }

    if (c > 0) {
        traslado = "Se desplaza " + c + " unidades hacia arriba.";
    } else if (c < 0) {
        traslado = "Se desplaza " + Math.abs(c) + " unidades hacia abajo.";
    } else {
        traslado = "No tiene desplazamiento vertical.";
    }

    document.getElementById("propiedades").innerHTML =
        "<article class='propiedad'><div><h3>Gráfica</h3><p>La función se representa con una línea recta.</p></div></article>" +
        "<article class='propiedad'><div><h3>Pendiente</h3><p>" + pendiente + "</p></div></article>" +
        "<article class='propiedad'><div><h3>Corte con el eje Y</h3><p>Corta el eje Y en el número " + c + ".</p></div></article>" +
        "<article class='propiedad'><div><h3>Paso por el origen</h3><p>" + paso + "</p></div></article>" +
        "<article class='propiedad'><div><h3>Valor de b</h3><p>En esta función b vale " + b + ".</p></div></article>" +
        "<article class='propiedad'><div><h3>Desplazamiento</h3><p>" + traslado + "</p></div></article>";
}

function graficar() {
    let x = 300;
    let y = 200;
    let escala = 15;
    let cuadricula = "";
    let numeros = "";

    for (let i = -10; i <= 10; i++) {
        let posicionX = x + i * escala;
        let posicionY = y - i * escala;

        cuadricula += "<line x1='" + posicionX + "' y1='0' x2='" + posicionX + "' y2='400' class='rejilla'/>";
        cuadricula += "<line x1='0' y1='" + posicionY + "' x2='600' y2='" + posicionY + "' class='rejilla'/>";

        if (i != 0 && i % 2 == 0) {
            numeros += "<text x='" + posicionX + "' y='217' text-anchor='middle' class='etiqueta-eje'>" + i + "</text>";
            numeros += "<text x='288' y='" + (posicionY + 4) + "' text-anchor='end' class='etiqueta-eje'>" + i + "</text>";
        }
    }

    document.getElementById("rejilla").innerHTML = cuadricula;

    document.getElementById("ejes").innerHTML =
        numeros +
        "<line x1='0' y1='200' x2='600' y2='200' class='eje'/>" +
        "<line x1='300' y1='0' x2='300' y2='400' class='eje'/>";

    let punto1 = b * (-20) + c;
    let punto2 = b * 20 + c;

    document.getElementById("recta").setAttribute("x1", 0);
    document.getElementById("recta").setAttribute("y1", y - punto1 * escala);
    document.getElementById("recta").setAttribute("x2", 600);
    document.getElementById("recta").setAttribute("y2", y - punto2 * escala);

    document.getElementById("punto-origen").setAttribute("cx", x);
    document.getElementById("punto-origen").setAttribute("cy", y);
    document.getElementById("punto-origen").setAttribute("r", c == 0 ? 6 : 0);

    let corte = y - c * escala;

    document.getElementById("punto-corte").setAttribute("cx", x);
    document.getElementById("punto-corte").setAttribute("cy", corte);

    if (corte >= 0 && corte <= 400) {
        document.getElementById("punto-corte").setAttribute("r", 6);
    } else {
        document.getElementById("punto-corte").setAttribute("r", 0);
    }

    document.getElementById("descripcion-grafica").textContent =
        "La recta tiene una pendiente de " + b + " y corta el eje Y en (0, " + c + ").";
}

document.getElementById("boton-generar").addEventListener("click", generar);

document.getElementById("archivo-geogebra").addEventListener("change", function() {
    let archivo = this.files[0];

    if (archivo && archivo.name.toLowerCase().endsWith(".ggb")) {
        document.getElementById("nombre-archivo").textContent = "Archivo seleccionado: " + archivo.name;
    } else {
        document.getElementById("nombre-archivo").textContent = "Selecciona un archivo .ggb válido.";
        this.value = "";
    }
});

generar();

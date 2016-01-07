"use strict";
var palabra, hombre, l, espacio;

//Nuestras palabras están en el archivo palabras.js
function contar_palabras() 
{
	/* Esta funcion no hace nada en el juego, nos ayuda a contar las palabras */
	var i = 0;
	for (i in pala()) 
	{
		i++;
	}
	console.info("Tienes " + i + " palabras.");
}

function aleatoria() 
{
	/* Retorna una palabra seleccionada al azar del arreglo palabras */
	var palabra = Math.floor(Math.random() * (pala().length));
	return pala()[palabra];
}

palabra = aleatoria();

var recargar = function() 
{
	$("#err").addClass("oculto");
	$("#letra").remove();
	$("#la").remove();
	$(".usa").remove();

	var actions = document.getElementById("action");
	actions.innerHTML += "<button class='volver' id='recargar'>Volver a comenzar</button>";

	$("#recargar").addClass("zoomInRight animated");

	var recar = document.getElementById("recargar");

	recar.addEventListener("click", function() {
		location.reload();
	});

};

//Declaracion de la clase Ahorcado
class Ahorcado {

	constructor(con) {

		this.contexto = con;
		this.maximo = 5;
		this.intentos = 0;
		this.vivo = true;

		this.dibujar();
		
	}

	dibujar() {

		var dibujo = this.contexto;

		//Dibujar el poste
		dibujo.beginPath();
		dibujo.moveTo(150,100);
		dibujo.lineTo(150,50);
		dibujo.lineTo(400,50);
		dibujo.lineTo(400,350);
		dibujo.lineWidth = 6;
		dibujo.strokeStyle = "#000";
		dibujo.stroke();
		dibujo.closePath();

		if (this.intentos > 0) 
		{
			// intentos = 1 ---> rostro
			dibujo.beginPath();
			dibujo.arc(150, 140, 40, 0, (Math.PI * 2), false);
			dibujo.strokeStyle = "brown";
			dibujo.lineWidth = 2;
			dibujo.stroke();
			dibujo.closePath();

			if (this.intentos > 1) 
			{
				// intentos = 2 --> torso
				dibujo.beginPath();
				dibujo.moveTo(150, 180);
				dibujo.lineTo(150, 250);
				dibujo.strokeStyle = "brown";
				dibujo.lineWidth = 2;
				dibujo.stroke();
				dibujo.closePath();

				if (this.intentos > 2) 
				{
					//intentos = 3 --> brazos
					dibujo.beginPath();
					dibujo.moveTo(120, 220);
					dibujo.lineTo(150, 180);
					dibujo.lineTo(180, 220);
					dibujo.strokeStyle = "brown";
					dibujo.lineWidth = 2;
					dibujo.stroke();
					dibujo.closePath();

					if (this.intentos > 3) 
					{
						//intentos = 4 --> piernas
						dibujo.beginPath();
						dibujo.moveTo(120, 290);
						dibujo.lineTo(150, 250);
						dibujo.lineTo(180, 290);
						dibujo.strokeStyle = "brown";
						dibujo.lineWidth = 2;
						dibujo.stroke();
						dibujo.closePath();

						if (this.intentos > 4) 
						{
							//intentos = 5 --> ojos muertos

							dibujo.beginPath();
							//Ojo izquierdo
							dibujo.moveTo(125,120);
							dibujo.lineTo(145,145);
							dibujo.moveTo(145,120);
							dibujo.lineTo(125,145);

							//Ojo derecho
							dibujo.moveTo(155,120);
							dibujo.lineTo(175,145);
							dibujo.moveTo(175,120);
							dibujo.lineTo(155,145);

							dibujo.strokeStyle = "orangered";
							dibujo.lineWidth = 2;
							dibujo.stroke();
							dibujo.closePath();

						}
					}

				}

			}
		}

	}

	trazar() {

		this.intentos++;
		if (this.intentos == 4) {
			header.innerText = "¡Cuidado!";
		}
		if (this.intentos >= this.maximo) 
		{
			this.vivo = false;
			$("#header").text("¡Se acabó!");
			mensaje.innerText = "Estás muerto :(  ";
			recargar();
			$(".stats").css({
				"background-color": "rgb(234, 134, 134)"
			});
			$("#mensaje").addClass("zoomInDown animated");
		}
		this.dibujar();

	}
}

function iniciar () 
{
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	var canvas = document.getElementById('c');
	canvas.width = 490;
	canvas.height = 390;
	var contexto = canvas.getContext("2d");
	hombre = new Ahorcado(contexto);

	// Convierte a mayúscula un texto
	palabra = palabra.toUpperCase();

	// Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabra.length);

	// Agregamos una funcion que se dispare al presionar enter
	l.addEventListener("keydown", agregarLetra);

	mostrarPista(espacio);
}

function agregarLetra(evento) 
{
	var letra = l.value;
	l.value = "";
	if (evento.keyCode == 13) {
		mostrarPalabra(palabra, hombre, letra);
	}
}

function mostrarPalabra(palabra, ahorcado, letra)
{
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();
	for (p in palabra)
	{
		if (letra == palabra[p]) 
		{
			espacio[p] = letra;
			encontrado = true;
		}
	}

	mostrarPista(espacio);

	// Si NO lo encontré
	if (!encontrado) 
	{
		ahorcado.trazar();
		errores.innerText = `${ahorcado.maximo - ahorcado.intentos} ${ahorcado.maximo - ahorcado.intentos == 1 ? 'intento' : 'intentos'}`;
	}


	if (!ahorcado.vivo) 
	{
		pista.innerText = " ";
		var i;
		for (i in palabra) 
		{
			pista.innerText += palabra[i] + " ";
		}
	}
}

function mostrarPista(espacio)
{
	var texto = "";
	var i;
	var largo = espacio.length;

	for (i = 0; i < largo; i++) 
	{
		if (espacio[i] != undefined) 
		{
			texto = texto + espacio[i] + " "; 
		}
		else 
		{
			texto += "_ ";
		}	
	}
	pista.innerText = texto;
	ganar();
}
var ganar = function() 
{
	var texto = pista.innerText;
	var v = 0;
	var l;
	for (l in texto)
	{
		if (texto[l] == "_")
		{
			v++;
		}
	}
	if (v == 0)
	{
		$("#header").text("¡Felicidades!");
		calidad();
	}
}
function calidad() 
{
	if (hombre.intentos == 0) 
	{
		mensaje.innerText = "Perfecto!! :-)  ";
		$(".stats").css({
			"background-color": "gold"
		});
		$("#mensaje").addClass("flip animated");
	}
	else if(hombre.intentos == 1)
	{
		mensaje.innerText = "Muy bien! :)  ";
		$(".stats").css({
			"background-color": "rgb(21, 240, 65)"
		});
		$("#mensaje").addClass("zoomInLeft animated");
	}
	else if (hombre.intentos == 4) 
	{
		mensaje.innerText = "Sobreviviste! ;)  ";
		$(".stats").css({
			"background-color": "rgb(255, 97, 50)"
		});
		$("#mensaje").addClass("zoomInLeft animated");
	}
	else 
	{
		mensaje.innerText = "Bien hecho! :)  ";
		$(".stats").css({
			"background-color": "rgb(21, 240, 65)"
		});
		$("#mensaje").addClass("zoomInLeft animated");
	}
	recargar();
}
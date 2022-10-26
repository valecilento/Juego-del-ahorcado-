var canvas = document.getElementById('horca');
var pincel = canvas.getContext("2d");
var palabras = ["ORACLE", "ALURA", "PROYECTO", "CHALLENGE", "AHORCADO"];
let palabraAleatoria = "";
let letras = [];
let errores = 8;
let aciertos = 0;
let letrasUsadas = [];
let estadoJuego = false;

function limpiarCanvas(){
    pincel.beginPath();
    pincel.clearRect(0,350,800,500);
    pincel.closePath();
}
function limpiarHorca(){
    pincel.beginPath();
    pincel.clearRect(262,70,200,240);
    pincel.closePath();
}

function iniciarJuego(){
    limpiarCanvas();
    limpiarHorca();
    estadoJuego = true;
    aciertos=0
    errores=8
    document.getElementById("horca").style.display = "flex";
    document.getElementById("boton-desaparece").style.display = "none";
    document.getElementById("botones-iniciar-juego").style.display = "flex";
    escogerPalabraSecreta();
    drawWordLines();
    dibujarAhorcado();
    letrasUsadas = [];

// touch.event para el teclado del movil//
    document.onkeydown = (e) =>{         // se puede usar el metodo addEventListener//
        let letra = e.key.toUpperCase();
        
        if(aciertos < palabraAleatoria.length && errores != 0 && comprobarLetra(letra, e.keyCode) && estadoJuego == true){
            if(!letrasUsadas.includes(letra)){
                letrasUsadas.push(letra);

                if(palabraAleatoria.includes(letra)){
                    for(let i = 0; i < palabraAleatoria.length; i ++){
                        if(palabraAleatoria[i] == letra){
                            dibujarLetraDeLaPalabra(i);
                            aciertos+=1
                            if(aciertos==palabraAleatoria.length){
                                console.log("ganaste!!");
                                Swal.fire("¡Felicitaciones, ganaste!");
                            }
                        }
                    }
                }else{
                    escribirLetraIncorrecta (letra);
                    dibujarLetrasIncorrectas (letra, errores); 
                    }     
                }    
        }    
    }
}
function agregarPalabra(){
    document.getElementById("cajaAgregaPalabra").style.display = "flex";
    document.getElementById("panelAgregaPalabra").style.display = "flex";
    document.getElementById("horca").style.display = "none";
    document.getElementById("boton-desaparece").style.display = "none";
}
//Introduce dentro del arreglo la palabra escrita por el usuario
function guardarPalabra(){
    let palabrasAgregadas = document.getElementById("textoagregarpalabra").value.toUpperCase();
    palabras.push(palabrasAgregadas);
    document.getElementById("textoagregarpalabra").value = "";
    console.log(palabrasAgregadas);
    document.getElementById("cajaAgregaPalabra").style.display = "none";
    document.getElementById("panelAgregaPalabra").style.display = "none";
    document.getElementById("horca").style.display = "flex";
    document.getElementById("botones-iniciar-juego").style.display = "flex";
    iniciarJuego()
}

//* el rango es por la tabla ascii//*
function comprobarLetra(key,keyCode){
    let estado = false;
    if( keyCode >= 65 && keyCode <= 90){
        letras.push(key);
        console.log(key);
        estado = true;
        return estado;
    } else{
        console.log(key);
        return estado;
    }
} 

function cancelar(){
    document.getElementById("cajaAgregaPalabra").style.display = "none";
    document.getElementById("panelAgregaPalabra").style.display = "none";
    document.getElementById("horca").style.display = "none";
    document.getElementById("boton-desaparece").style.display = "flex";  
}
function desistir(){
    document.getElementById("botones-iniciar-juego").style.display = "none"; 
    document.getElementById("boton-desaparece").style.display = "flex";
    document.getElementById("horca").style.display = "none";
    estadoJuego = false;
    limpiarCanvas();
    limpiarHorca();
}

function escogerPalabraSecreta(){
    let palabra      = palabras[Math.floor(Math.random()*palabras.length)];
    palabraAleatoria = palabra;
    console.log(palabraAleatoria);
}

function drawWordLines(){
    pincel.beginPath();
    pincel.lineWidth   =   5;
    pincel.lineCap     =   "round";
    pincel.lineJoin    =   "round";
    pincel.fillStyle   =   "#DD3388";
    pincel.strokeStyle =   "#black";
    
    let ancho = 600 / palabraAleatoria.length;
    for(let i = 0; i < palabraAleatoria.length; i++){
        pincel.moveTo(120 + (ancho*i), 450); 
        pincel.lineTo(180 + (ancho*i), 450); 
    }
    pincel.stroke();
    pincel.closePath();
}

function dibujarLetraDeLaPalabra(index){
    pincel.beginPath();
    pincel.font = 'bold 52px Arial';
    pincel.lineWidth = 6;
    pincel.lineCap   = "round";
    pincel.lineJoin  = "round";
    pincel.fillStyle = "#DD3388";

    let ancho = 600 / palabraAleatoria.length; 
    pincel.fillText(palabraAleatoria[index], 130 + (ancho*index), 430); //(texto, x, y) //
    pincel.stroke();
}
function dibujarLetrasIncorrectas(letra, errorsLeft){
    pincel.beginPath();
    pincel.font = "bold 40px Arial";
    pincel.lineWidth = 6;
    pincel.lineCap   = "round";
    pincel.lineJoin  = "round";
    pincel.fillStyle = "#DD3388";
    pincel.fillText (letra, 10 +(40 *(8 - errorsLeft)), 500, 30);   // (texto, x, y, maxWidth) 40 es el tamaño de la fuente//
   
}
function escribirLetraIncorrecta(){
    errores -= 1;
    console.log (errores);
    dibujarAhorcado();
    if(errores==0){
        console.log("Perdiste!!");
        Swal.fire("Ups..Perdiste. La palabra era " + palabraAleatoria + " ¡Intentalo de nuevo!");
    }
}

if (canvas.getContext) {
    pincel.lineWidth = 4;

    //* linea baja horizontal
    pincel.beginPath();
    pincel.moveTo(130,350);
    pincel.lineTo(500,350);
    pincel.strokeStyle = "#black";
    pincel.stroke();

    //* columna vertical
    pincel.beginPath();
    pincel.moveTo(260,350);
    pincel.lineTo(260,80);
    pincel.strokeStyle = "#black";
    pincel.stroke();
}


//Dibuja una parte del ahorcado segun los errores cometidos
function dibujarAhorcado(){
    if (canvas.getContext) {
        pincel.beginPath();
        pincel.lineWidth = 4;
        pincel.lineCap = "round";
        pincel.lineJoin = "round";
        pincel.fillStyle = "#black";
        pincel.strokeStyle = "#black";
        
       

        if(errores == 7){
        pincel.moveTo(260,80);
        pincel.lineTo(360,80);
        
        }
        if(errores == 6){
        pincel.moveTo(360,80);
        pincel.lineTo(360,130);
        }
        if(errores == 5){
        pincel.arc(360, 155, 25, 0, 2 * Math.PI);
        }
        if(errores == 4){
        pincel.moveTo(360,180);
        pincel.lineTo(360,260);
        }
        if(errores == 3){
        pincel.moveTo(360,200);
        pincel.lineTo(390,230);
        }
        if(errores == 2){
        pincel.moveTo(360,200); 
        pincel.lineTo(330,230);
        }
        if(errores == 1){
        pincel.moveTo(360,260); 
        pincel.lineTo(390,300);
        }
        if(errores == 0){
        pincel.moveTo(360,260);
        pincel.lineTo(330,300);
        }
        pincel.stroke();
        pincel.closePath();
    }
}
